import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice.js'
import bookingSlice from './slices/bookingSlice.js'
import chatSlice from './slices/chatSlice.js'
import reviewSlice from './slices/reviewSlice.js'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingSlice,
    chat: chatSlice,
    review: reviewSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
