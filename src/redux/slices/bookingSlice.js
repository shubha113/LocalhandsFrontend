import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMe } from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL || "https://localhands.onrender.com/api/v1";

// Upload KYC
export const uploadKYC = createAsyncThunk(
  "booking/uploadKYC",
  async (kycData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}/providers/upload-kyc`,
        kycData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Dispatch getMe to update the user state with new KYC status
      dispatch(getMe());
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload KYC document."
      );
    }
  }
);

// Get Service Category Statistics
export const getCategoryStats = createAsyncThunk(
  "booking/getCategoryStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/service/category-stats`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category statistics."
      );
    }
  }
);

//get subcategory
export const getSubCategoryStats = createAsyncThunk(
  "booking/getSubCategoryStats",
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/service/${categoryName}/subcategories`
      );
      console.log(response); // Consider removing console.logs in production code
      return {
        category: response.data.category,
        subcategories: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch subcategory statistics."
      );
    }
  }
);

//fetch nearby providers
export const getNearbyProviders = createAsyncThunk(
  "booking/getNearbyProviders",
  async ({ category, subcategory, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/get-poviders?category=${encodeURIComponent(
          category
        )}&subcategory=${encodeURIComponent(subcategory)}&page=${page}`
      );
      console.log(response); // Consider removing console.logs in production code
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch nearby providers."
      );
    }
  }
);

// createBooking thunk
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/create`,
        bookingData
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create booking."
      );
    }
  }
);

//accept booking
export const acceptBooking = createAsyncThunk(
  "bookings/acceptBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/booking/${bookingId}/accept`
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept booking."
      );
    }
  }
);

//reject booking
export const rejectBooking = createAsyncThunk(
  "bookings/rejectBooking",
  async ({ bookingId, reason }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/booking/${bookingId}/reject`,
        { reason }
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject booking."
      );
    }
  }
);

//get booking details
export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async (bookingId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/bookings/${bookingId}/single-booking`);
      console.log(data);
      return data.booking;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// get all bookings for the logged-in user or provider
export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async ({ status = "" } = {}, { rejectWithValue }) => {
    try {
      let url = `${API_URL}/booking/my-bookings`;
      if (status) {
        url += `?status=${encodeURIComponent(status)}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch your bookings."
      );
    }
  }
);

// cancel booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ bookingId, reason }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/booking/${bookingId}/cancel`,
        { reason }
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking."
      );
    }
  }
);

// Generate completion OTP
export const generateCompletionOTP = createAsyncThunk(
  "bookings/generateCompletionOTP",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/${bookingId}/completion-otp`
      );
      return response.data; // success, message, data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate OTP."
      );
    }
  }
);

// Complete booking with OTP
export const completeBookingWithOTP = createAsyncThunk(
  "bookings/completeBookingWithOTP",
  async ({ bookingId, otp, workImages, notes }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/booking/${bookingId}/complete`,
        { otp, workImages, notes }
      );
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to complete booking with OTP."
      );
    }
  }
);

// Create payment order
export const createPaymentOrder = createAsyncThunk(
  "booking/createPaymentOrder",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/payment/create-payment`, {
        bookingId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create payment order."
      );
    }
  }
);

// Verify payment after user completes payment
export const verifyPayment = createAsyncThunk(
  "booking/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/payment/verify-payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed."
      );
    }
  }
);

const initialState = {
  booking: null,
  loading: false,
  error: null,
  categoryStats: [],
  categoryStatsLoading: false,
  categoryStatsError: null,
  subCategoryStats: {
    category: null,
    subcategories: [],
  },
  subCategoryStatsLoading: false,
  subCategoryStatsError: null,

  bookings: [],
  loadingMyBookings: false,
  errorMyBookings: null,

  // Nearby Providers
  nearbyProviders: null,
  providersLoading: false,
  providersError: null,

  // Booking Creation
  createBookingLoading: false,
  createBookingError: null,
  createdBooking: null,

  // KYC Upload
  uploadKYCLoading: false,
  uploadKYCError: null,
  uploadKYCMessage: null,

  //accept booking
  acceptBookingLoading: false,
  acceptBookingError: null,
  acceptedBooking: null,

  //reject booking
  rejectBookingLoading: false,
  rejectBookingError: null,
  rejectedBooking: null,

  //cancell booking
  cancelBookingLoading: false,
  cancelBookingError: null,
  cancelledBooking: null,

  // Generate Completion OTP
  generateOTPLoading: false,
  generateOTPError: null,
  generatedOTPInfo: null,

  // Complete Booking With OTP
  completeBookingLoading: false,
  completeBookingError: null,
  completedBooking: null,

  //create payment
  paymentLoading: false,
  paymentError: null,
  paymentOrder: null,

  //verify payment
  verifyPaymentLoading: false,
  verifyPaymentError: null,
  verifiedPayment: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.createBookingError = null;
      state.providersError = null;
      state.categoryStatsError = null;
      state.subCategoryStatsError = null;
      state.uploadKYCError = null;
    },
    clearBookingMessage: (state) => {
      state.uploadKYCMessage = null;
    },
    clearCreatedBooking: (state) => {
      state.createdBooking = null;
    },
     clearGeneratedOTPInfo: (state) => {
      state.generatedOTPInfo = null;
    },
    clearCompletedBooking: (state) => {
      state.completedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // upload KYC
      .addCase(uploadKYC.pending, (state) => {
        state.uploadKYCLoading = true;
        state.uploadKYCError = null;
        state.uploadKYCMessage = null;
      })
      .addCase(uploadKYC.fulfilled, (state, action) => {
        state.uploadKYCLoading = false;
        state.uploadKYCMessage = action.payload;
      })
      .addCase(uploadKYC.rejected, (state, action) => {
        state.uploadKYCLoading = false;
        state.uploadKYCError = action.payload;
        state.uploadKYCMessage = null;
      })

      // get category stats
      .addCase(getCategoryStats.pending, (state) => {
        state.categoryStatsLoading = true;
        state.categoryStatsError = null;
      })
      .addCase(getCategoryStats.fulfilled, (state, action) => {
        state.categoryStatsLoading = false;
        state.categoryStats = action.payload;
      })
      .addCase(getCategoryStats.rejected, (state, action) => {
        state.categoryStatsLoading = false;
        state.categoryStatsError = action.payload;
      })

      // get subcategory stats
      .addCase(getSubCategoryStats.pending, (state) => {
        state.subCategoryStatsLoading = true;
        state.subCategoryStatsError = null;
      })
      .addCase(getSubCategoryStats.fulfilled, (state, action) => {
        state.subCategoryStatsLoading = false;
        state.subCategoryStats = {
          category: action.payload.category,
          subcategories: action.payload.subcategories,
        };
      })
      .addCase(getSubCategoryStats.rejected, (state, action) => {
        state.subCategoryStatsLoading = false;
        state.subCategoryStatsError = action.payload;
      })

      // get nearby providers
      .addCase(getNearbyProviders.pending, (state) => {
        state.providersLoading = true;
        state.providersError = null;
      })
      .addCase(getNearbyProviders.fulfilled, (state, action) => {
        state.providersLoading = false;
        state.nearbyProviders = action.payload;
        state.providersError = null;
      })
      .addCase(getNearbyProviders.rejected, (state, action) => {
        state.providersLoading = false;
        state.providersError = action.payload;
        state.nearbyProviders = null;
      })

      // create booking
      .addCase(createBooking.pending, (state) => {
        state.createBookingLoading = true;
        state.createBookingError = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createBookingLoading = false;
        state.createdBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createBookingLoading = false;
        state.createBookingError = action.payload;
      })

      // Accept Booking
      .addCase(acceptBooking.pending, (state) => {
        state.acceptBookingLoading = true;
        state.acceptBookingError = null;
      })
      .addCase(acceptBooking.fulfilled, (state, action) => {
        state.acceptBookingLoading = false;
        state.acceptedBooking = action.payload;
      })
      .addCase(acceptBooking.rejected, (state, action) => {
        state.acceptBookingLoading = false;
        state.acceptBookingError = action.payload;
      })

      // Reject Booking
      .addCase(rejectBooking.pending, (state) => {
        state.rejectBookingLoading = true;
        state.rejectBookingError = null;
      })
      .addCase(rejectBooking.fulfilled, (state, action) => {
        state.rejectBookingLoading = false;
        state.rejectedBooking = action.payload;
      })
      .addCase(rejectBooking.rejected, (state, action) => {
        state.rejectBookingLoading = false;
        state.rejectBookingError = action.payload;
      })

      //get single booking
      .addCase(getBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get all bookings
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.cancelBookingLoading = true;
        state.cancelBookingError = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.cancelBookingLoading = false;
        state.cancelledBooking = action.payload;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelBookingLoading = false;
        state.cancelBookingError = action.payload;
      })

      // Generate Completion OTP
      .addCase(generateCompletionOTP.pending, (state) => {
        state.generateOTPLoading = true;
        state.generateOTPError = null;
        state.generatedOTPInfo = null;
      })
      .addCase(generateCompletionOTP.fulfilled, (state, action) => {
        state.generateOTPLoading = false;
        state.generatedOTPInfo = action.payload;
      })
      .addCase(generateCompletionOTP.rejected, (state, action) => {
        state.generateOTPLoading = false;
        state.generateOTPError = action.payload;
      })

      // Complete Booking With OTP
      .addCase(completeBookingWithOTP.pending, (state) => {
        state.completeBookingLoading = true;
        state.completeBookingError = null;
        state.completedBooking = null;
      })
      .addCase(completeBookingWithOTP.fulfilled, (state, action) => {
        state.completeBookingLoading = false;
        state.completedBooking = action.payload;
      })
      .addCase(completeBookingWithOTP.rejected, (state, action) => {
        state.completeBookingLoading = false;
        state.completeBookingError = action.payload;
      })

      //create payment
      .addCase(createPaymentOrder.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      //verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.verifyPaymentLoading = true;
        state.verifyPaymentError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyPaymentLoading = false;
        state.verifiedPayment = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyPaymentLoading = false;
        state.verifyPaymentError = action.payload;
      });
  },
});

export const { clearBookingError, clearBookingMessage, clearCreatedBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
