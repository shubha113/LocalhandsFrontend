import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Send,
  Paperclip,
  ArrowLeft,
  Phone // Only Phone icon remains as requested
} from 'lucide-react';
import {
  getChatMessages,
  sendMessage,
  markMessagesAsRead,
  clearChatErrors,
  createChatRoom
} from '../../redux/slices/chatSlice.js';
import { socketService } from '../../utils/socket.js';

const Chat = () => { // Removed `navigate` from props
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const initializationRef = useRef(false);
  const navigate = useNavigate(); // Initialize navigate using the hook

  // Get bookingId from URL parameters
  const { bookingId } = useParams();

  // Get state from Redux
  const {
    chatMessages,
    chatRoom,
    fetchingMessages,
    sendingMessage,
    fetchMessagesError,
  } = useSelector((state) => state.chat);

  // Get actual logged-in user from auth slice
  const { user: currentUser } = useSelector((state) => state.auth);

  // Local state
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Helper to determine the other user in the chat
  const getOtherUser = () => {
    if (!chatRoom || !currentUser?._id) return null;

    // Find the participant that is not the current user
    if (chatRoom.user && chatRoom.user._id !== currentUser._id) {
      return chatRoom.user;
    }
    if (chatRoom.provider && chatRoom.provider._id !== currentUser._id) {
      return chatRoom.provider;
    }
    return null;
  };
  const otherUser = getOtherUser();

  // Initialize socket connection and listeners
  useEffect(() => {
    // Connect socket only if currentUser._id is available and socket is not already connected
    if (currentUser?._id && !socketService.isConnected) {
      socketService.connect(currentUser._id);
    }

    if (chatRoom?._id) {
      socketService.joinChat(chatRoom._id);

      const handleNewMessage = (data) => {
        if (data.chatId === chatRoom._id) {
          dispatch(getChatMessages({ chatId: chatRoom._id }));
          // Ensure data.message.sender is compared with currentUser._id
          if (data.message.sender !== currentUser._id) {
            showNotification(
              `New message from ${otherUser?.name || otherUser?.businessName || 'Someone'}`,
              {
                body: data.message.content || 'Media message',
                tag: data.chatId
              }
            );
          }
        }
      };

      const handleUserTyping = (data) => {
        // Ensure data.userId is compared with currentUser._id
        if (data.userId !== currentUser._id) {
          setOtherUserTyping(true);
        }
      };

      const handleUserStopTyping = (data) => {
        if (data.userId !== currentUser._id) {
          setOtherUserTyping(false);
        }
      };

      socketService.onNewMessage(handleNewMessage);
      socketService.onUserTyping(handleUserTyping);
      socketService.onUserStopTyping(handleUserStopTyping);

      return () => {
        socketService.off('new-message', handleNewMessage);
        socketService.off('user-typing', handleUserTyping);
        socketService.off('user-stop-typing', handleUserStopTyping);
        socketService.leaveChat(chatRoom._id);
        socketService.disconnect();
      };
    }
  }, [chatRoom?._id, currentUser?._id, dispatch, otherUser?.name, otherUser?.businessName]);

  // Initialize chat room and fetch messages
  useEffect(() => {
    // Prevent duplicate initialization
    if (initializationRef.current) return;

    // Only proceed if currentUser is loaded
    if (!currentUser?._id) {
        console.log("[Chat Init] Waiting for current user data...");
        return;
    }

    if (!bookingId) {
      console.warn("Chat component mounted without a bookingId.");
      return;
    }

    const initializeChat = async () => {
      try {
        initializationRef.current = true; // Mark as initializing

        // Check if we need to create/fetch chat room
        if (!chatRoom || chatRoom.booking?._id !== bookingId) {
          console.log(`[Chat Init] Creating/fetching chat room for bookingId: ${bookingId}`);

          const result = await dispatch(createChatRoom({ bookingId })).unwrap();

          if (result?._id) {
            console.log(`[Chat Init] Chat room ready with ID: ${result._id}. Fetching messages.`);
            await dispatch(getChatMessages({ chatId: result._id }));
          } else {
            console.error("[Chat Init] createChatRoom did not return a valid chatRoom _id.");
          }
        } else if (chatRoom?._id && chatMessages.length === 0 && !fetchingMessages && !fetchMessagesError) {
          // Chat room exists but no messages loaded
          console.log(`[Chat Init] Chat room ${chatRoom._id} exists, fetching messages.`);
          await dispatch(getChatMessages({ chatId: chatRoom._id }));
        }
      } catch (error) {
        console.error("[Chat Init] Failed to initialize chat:", error);
      } finally {
        initializationRef.current = false; // Reset initialization flag
      }
    };

    initializeChat();

    // Cleanup function
    return () => {
      dispatch(clearChatErrors());
      initializationRef.current = false;
    };
  }, [bookingId, currentUser?._id]);

  // Mark messages as read when new messages arrive or chatRoom changes
  useEffect(() => {
    if (chatRoom?._id && chatMessages.length > 0 && currentUser?._id) {
      const unreadMessagesExist = chatMessages.some(
        msg => msg.sender !== currentUser._id && !msg.isRead
      );
      if (unreadMessagesExist) {
        dispatch(markMessagesAsRead(chatRoom._id));
      }
    }
  }, [chatMessages, chatRoom?._id, currentUser?._id, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearChatErrors());
    };
  }, [dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Allow sending if there's either content OR files
    if (!newMessage.trim() && selectedFiles.length === 0) {
      console.log('No message content or files. Cannot send.');
      return;
    }

    let actualChatId = chatRoom?._id;

    // If chatRoom._id isn't available, try to create it
    if (!actualChatId) {
      if (!bookingId) {
        console.error('Fatal: Booking ID is missing. Cannot create chat or send message.');
        return;
      }
      try {
        const creationResult = await dispatch(createChatRoom({ bookingId })).unwrap();
        actualChatId = creationResult._id;
      } catch (error) {
        console.error('Failed to create/get chat room during send attempt:', error);
        return;
      }
    }

    if (!actualChatId) {
      console.error('Cannot send message: No chat ID could be determined.');
      return;
    }

    const formData = new FormData();

    // Always include content, even if empty (to avoid backend validation error)
    formData.append('content', newMessage.trim() || ' ');
    formData.append('messageType', selectedFiles.length > 0 ? 'file' : 'text');

    selectedFiles.forEach(file => {
      formData.append('attachments', file);
    });

    try {
      const result = await dispatch(sendMessage({
        chatId: actualChatId,
        data: formData
      })).unwrap();

      // Clear inputs only after successful send
      setNewMessage('');
      setSelectedFiles([]);
      stopTyping();

    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!isTyping && chatRoom?._id && socketService.isConnected && currentUser?._id) { // Ensure currentUser._id
      setIsTyping(true);
      socketService.startTyping(chatRoom._id, currentUser._id); // Use currentUser._id
    }

    clearTimeout(window.typingTimer);
    window.typingTimer = setTimeout(() => {
      stopTyping();
    }, 2000);
  };

  const stopTyping = () => {
    if (isTyping && chatRoom?._id && socketService.isConnected && currentUser?._id) { // Ensure currentUser._id
      setIsTyping(false);
      socketService.stopTyping(chatRoom._id, currentUser._id); // Use currentUser._id
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const isMyMessage = (message) => {
    return message.sender === currentUser?._id; // Use currentUser._id
  };

  const getSenderName = (message) => {
    if (isMyMessage(message)) {
      return 'You';
    }

    // Use senderInfo if available, otherwise fall back to otherUser
    if (message.senderInfo) {
      return message.senderInfo.name || message.senderInfo.businessName || 'Unknown';
    }

    return otherUser?.name || otherUser?.businessName || 'Unknown';
  };

  const showNotification = (title, options) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      });
    }
  };

  // Show loading spinner if current user data is not yet loaded
  if (!currentUser?._id) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Loading user data...</p>
        </div>
    );
  }

  if (fetchingMessages) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (fetchMessagesError && !chatRoom?._id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{fetchMessagesError}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-white hover:bg-gray-800 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {otherUser && (
            <>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {otherUser.avatar?.url ? (
                  <img
                    src={otherUser.avatar.url}
                    alt={otherUser.name || otherUser.businessName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {(otherUser.name || otherUser.businessName)?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-medium text-white">
                  {otherUser.name || otherUser.businessName || 'Unknown User'}
                </h3>
                {otherUserTyping && (
                  <p className="text-sm text-green-500">Typing...</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-white hover:bg-gray-800 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatRoom?._id ? (
            // Sort messages by createdAt in ascending order (oldest first)
            [...chatMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((message, index, sortedMessages) => {
                const isMe = isMyMessage(message);
                const showDate = index === 0 ||
                  formatDate(message.createdAt) !== formatDate(sortedMessages[index - 1]?.createdAt);

                return (
                  <div key={message._id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    )}

                    {/* Proper message alignment based on sender */}
                    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md`}>
                        {/* Show sender name for clarity */}
                        <div className={`text-xs mb-1 ${isMe ? 'text-right text-blue-600' : 'text-left text-gray-600'}`}>
                          {getSenderName(message)}
                        </div>

                        <div className={`px-4 py-2 rounded-lg ${
                          isMe
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                            : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                        }`}>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mb-2">
                              {message.attachments.map((attachment, idx) => (
                                <div key={idx} className="mb-1">
                                  {attachment.url && (
                                    <div>
                                      {/* Check if it's an image */}
                                      {attachment.filename?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                        <img
                                          src={attachment.url}
                                          alt={attachment.filename}
                                          className="max-w-full h-auto rounded mb-1"
                                        />
                                      ) : (
                                        <div className={`p-2 rounded border ${isMe ? 'bg-blue-400' : 'bg-gray-100'}`}>
                                          <div className="flex items-center space-x-2">
                                            <Paperclip className="w-4 h-4" />
                                            <a
                                              href={attachment.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`text-sm underline ${isMe ? 'text-blue-100' : 'text-blue-600'}`}
                                            >
                                              {attachment.filename}
                                            </a>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {message.content && message.content.trim() && (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}

                          <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
                            isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            <span>{formatTime(message.createdAt)}</span>
                            {isMe && message.isRead && (
                              <span className="text-xs">✓✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
        ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                {fetchingMessages ? "Loading chat..." : "Initializing chat..."}
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
                <span className="text-sm truncate max-w-20">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
            accept="image/*,application/pdf,.doc,.docx,.txt,.xlsx,.xls"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleTyping}
              onBlur={stopTyping}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={(!newMessage.trim() && selectedFiles.length === 0) || sendingMessage || !chatRoom?._id}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingMessage ? (
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
