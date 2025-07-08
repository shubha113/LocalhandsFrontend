import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://localhands.onrender.com/api/v1";
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Set Axios default header if token exists
if (storedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}

//set up axios defaults
axios.defaults.withCredentials = true;

//async thunk for register call
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/register-user`,
        userData
      );
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Set default authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

//register provider
export const registerProvider = createAsyncThunk(
  "auth/registerProvider",
  async (providerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/providers/register-provider`,
        providerData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Provider registration failed"
      );
    }
  }
);

// verify email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

//resend email verification
export const resendEmailVerification = createAsyncThunk(
  "auth/resendEmailVerification",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/resend-email-verification`,
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend verification email"
      );
    }
  }
);

//login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

//logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${API_URL}/auth/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// get profile
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data.user;
    } catch (error) {
      // If getMe fails, it means the token is invalid or expired.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(
        error.response?.data?.message || "Fetching profile failed"
      );
    }
  }
);

// Upload Avatar
export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/auth/me/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.avatar;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload avatar"
      );
    }
  }
);

// Update Provider Profile
export const updateProviderProfile = createAsyncThunk(
  "auth/updateProviderProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/auth/me/provider`,
        profileData
      );

      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        const newUserData = { ...updatedUser, ...response.data.provider };
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      return response.data.provider;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update provider profile"
      );
    }
  }
);

//update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/auth/me/update`,
        profileData
      );

      // Update localStorage user
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) {
        const newUserData = { ...updatedUser, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Toggle Provider Availability
export const toggleAvailability = createAsyncThunk(
  "auth/toggleAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/providers/toggle-availability`
      );
      return response.data.isAvailable;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle availability"
      );
    }
  }
);


const initialState = {
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  user: storedUser,
  loading: false,
  profileLoading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    },
  },

  extraReducers: (builder) => {
    builder
      //register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      //register provider
      .addCase(registerProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerProvider.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      })

      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //resend email verification
      .addCase(resendEmailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resendEmailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
      })

      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        // Even if logout fails on server, client state should be cleared
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })

      //get profile
      .addCase(getMe.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.profileLoading = false;
      })

      //upload avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user.avatar = action.payload;
        state.message = "Avatar Uploaded Successfully";
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      //update provider profile
      .addCase(updateProviderProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProviderProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.message = "Provider profile updated successfully";
      })
      .addCase(updateProviderProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      // update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.message = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      })

      //toggle availability
      .addCase(toggleAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(toggleAvailability.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.isAvailable = action.payload;
        }
        state.message = `Availability ${
          action.payload ? "enabled" : "disabled"
        } successfully`;
      })
      .addCase(toggleAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
