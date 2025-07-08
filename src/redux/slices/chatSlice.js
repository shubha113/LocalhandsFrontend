import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";


const API_URL = import.meta.env.VITE_API_URL || "https://localhands.onrender.com/api/v1";

//create chat room
export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/chat/create`, { bookingId });
      return response.data.chatRoom;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create chat room."
      );
    }
  }
);

//send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/chat/send/${chatId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message."
      );
    }
  }
);

//get chat messages 
export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async ({ chatId, page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_URL}/chat/get-messages/${chatId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chat messages."
      );
    }
  }
);

//mark messages as read
export const markMessagesAsRead = createAsyncThunk(
  "chat/markMessagesAsRead",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/chat/${chatId}/read`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark messages as read."
      );
    }
  }
);

//get chat room
export const getUserChatRooms = createAsyncThunk(
  "chat/getUserChatRooms",
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_URL}/chat/user?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chat rooms."
      );
    }
  }
);

//close chat room
export const closeChatRoom = createAsyncThunk(
  "chat/closeChatRoom",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/chat/close/${chatId}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to close chat room."
      );
    }
  }
);


const initialState = {
  // Create chat room
  creatingChatRoom: false,
  createChatRoomError: null,
  createdChatRoom: null,

  // Send message
  sendingMessage: false,
  sendMessageError: null,
  lastSentMessage: null,

  // Chat messages
  fetchingMessages: false,
  fetchMessagesError: null,
  chatMessages: [],
  chatRoom: null,
  messagesPagination: null,

  // Mark messages as read
  markingRead: false,
  markReadError: null,
  markReadMessage: null,

  // User chat rooms
  fetchingChatRooms: false,
  fetchChatRoomsError: null,
  chatRooms: [],
  chatRoomsPagination: null,

  // Close chat room
  closingChatRoom: false,
  closeChatRoomError: null,
  closeChatMessage: null,
};



const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatErrors: (state) => {
      state.createChatRoomError = null;
      state.sendMessageError = null;
      state.fetchMessagesError = null;
      state.markReadError = null;
      state.fetchChatRoomsError = null;
      state.closeChatRoomError = null;
    },
        clearChatState: (state) => {
      state.chatMessages = [];
      state.chatRoom = null;
      state.createdChatRoom = null;
      state.lastSentMessage = null;
    },

  },
  extraReducers: (builder) => {
    builder

      // Create chat room
      .addCase(createChatRoom.pending, (state) => {
        state.creatingChatRoom = true;
        state.createChatRoomError = null;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.creatingChatRoom = false;
        state.createdChatRoom = action.payload;
        state.chatRoom = action.payload;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.creatingChatRoom = false;
        state.createChatRoomError = action.payload;
      })

      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
        state.sendMessageError = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        state.lastSentMessage = action.payload;
        state.chatMessages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.sendMessageError = action.payload;
      })

      // Get chat messages
      .addCase(getChatMessages.pending, (state) => {
        state.fetchingMessages = true;
        state.fetchMessagesError = null;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.fetchingMessages = false;
        state.chatMessages = action.payload.messages;
        state.chatRoom = action.payload.chatRoom;
        state.messagesPagination = action.payload.pagination;
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.fetchingMessages = false;
        state.fetchMessagesError = action.payload;
      })

      // Mark messages as read
      .addCase(markMessagesAsRead.pending, (state) => {
        state.markingRead = true;
        state.markReadError = null;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        state.markingRead = false;
        state.markReadMessage = action.payload;
        // Update local messages to mark them as read
        state.chatMessages.forEach(message => {
          if (!message.isRead && message.sender !== state.user?.id) {
            message.isRead = true;
            message.readAt = new Date().toISOString();
          }
        });
      })
      .addCase(markMessagesAsRead.rejected, (state, action) => {
        state.markingRead = false;
        state.markReadError = action.payload;
      })

      // Get user chat rooms
      .addCase(getUserChatRooms.pending, (state) => {
        state.fetchingChatRooms = true;
        state.fetchChatRoomsError = null;
      })
      .addCase(getUserChatRooms.fulfilled, (state, action) => {
        state.fetchingChatRooms = false;
        state.chatRooms = action.payload.chatRooms;
        state.chatRoomsPagination = action.payload.pagination;
      })
      .addCase(getUserChatRooms.rejected, (state, action) => {
        state.fetchingChatRooms = false;
        state.fetchChatRoomsError = action.payload;
      })

      // Close chat room
      .addCase(closeChatRoom.pending, (state) => {
        state.closingChatRoom = true;
        state.closeChatRoomError = null;
      })
      .addCase(closeChatRoom.fulfilled, (state, action) => {
        state.closingChatRoom = false;
        state.closeChatMessage = action.payload;
      })
      .addCase(closeChatRoom.rejected, (state, action) => {
        state.closingChatRoom = false;
        state.closeChatRoomError = action.payload;
      });
  },
});
export const { clearChatErrors } = chatSlice.actions;
export default chatSlice.reducer;
