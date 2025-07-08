import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

const API_URL = import.meta.env.VITE_API_URL || "https://localhands.onrender.com/api/v1";

// Create Review
export const createReview = createAsyncThunk(
  "review/createReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/review/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review."
      );
    }
  }
);

// Get Provider Reviews
export const getProviderReviews = createAsyncThunk(
  "review/getProviderReviews",
  async ({ providerId, page = 1, limit = 10, rating }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({ page, limit });
      if (rating) query.append("rating", rating);
      const response = await api.get(`${API_URL}/review/provider/${providerId}?${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch provider reviews."
      );
    }
  }
);

// Get Review Details
export const getReviewDetails = createAsyncThunk(
  "review/getReviewDetails",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/review/${reviewId}`);
      return response.data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch review details."
      );
    }
  }
);

const initialState = {
  // Create
  creatingReview: false,
  createReviewError: null,
  createdReview: null,

  // Get Provider Reviews
  fetchingProviderReviews: false,
  providerReviews: [],
  providerReviewsError: null,
  providerReviewsPagination: null,
  ratingDistribution: [],

  // Get Review Details
  fetchingReviewDetails: false,
  reviewDetails: null,
  reviewDetailsError: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewErrors: (state) => {
      state.createReviewError = null;
      state.providerReviewsError = null;
      state.reviewDetailsError = null;
    },
    clearReviewState: (state) => {
      state.createdReview = null;
      state.reviewDetails = null;
      state.providerReviews = [];
      state.ratingDistribution = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.creatingReview = true;
        state.createReviewError = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.creatingReview = false;
        state.createdReview = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.creatingReview = false;
        state.createReviewError = action.payload;
      })

      // Get Provider Reviews
      .addCase(getProviderReviews.pending, (state) => {
        state.fetchingProviderReviews = true;
        state.providerReviewsError = null;
      })
      .addCase(getProviderReviews.fulfilled, (state, action) => {
        state.fetchingProviderReviews = false;
        state.providerReviews = action.payload.reviews;
        state.providerReviewsPagination = action.payload.pagination;
        state.ratingDistribution = action.payload.ratingDistribution;
      })
      .addCase(getProviderReviews.rejected, (state, action) => {
        state.fetchingProviderReviews = false;
        state.providerReviewsError = action.payload;
      })

      // Get Review Details
      .addCase(getReviewDetails.pending, (state) => {
        state.fetchingReviewDetails = true;
        state.reviewDetailsError = null;
      })
      .addCase(getReviewDetails.fulfilled, (state, action) => {
        state.fetchingReviewDetails = false;
        state.reviewDetails = action.payload;
      })
      .addCase(getReviewDetails.rejected, (state, action) => {
        state.fetchingReviewDetails = false;
        state.reviewDetailsError = action.payload;
      });
  }
});

export const { clearReviewErrors, clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
