import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { User } from '@/types/user.types';
import type {
  UpdateAccountDetailsInput,
  LoginData,
  ApiResponse,
  TokenResponse,
  UpdateUserAvatarInput,
  UpdateUserCoverImageInput,
  GetUserChannelProfileInput,
  WatchHistoryData
} from '@/types';
import { setSuccessState } from '@/utils/successState';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};


export const updateAccountDetails = createAsyncThunk<ApiResponse<LoginData>, UpdateAccountDetailsInput>(
  'users/updateAccountDetails',
  async (details, { rejectWithValue }) => {
    try {
      const { data } = await api.patch('/users/update-account', details, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update account details');
    }
  }
);

export const refreshAccessToken = createAsyncThunk<ApiResponse<TokenResponse>, void>(
  'users/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/refresh-token');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to refresh access token');
    }
  }
);

export const updateUserAvatar = createAsyncThunk<ApiResponse<LoginData>, UpdateUserAvatarInput>(
  'users/updateUserAvatar',
  async (avatarData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarData.avatar);
      const { data } = await api.patch('/users/update-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user avatar');
    }
  }
);

export const updateUserCoverImage = createAsyncThunk<ApiResponse<LoginData>, UpdateUserCoverImageInput>(
  'users/updateUserCoverImage',
  async (coverImageData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', coverImageData.coverImage);
      const { data } = await api.patch('/users/update-cover-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user cover image');
    }
  }
);

export const getUserChannelProfile = createAsyncThunk<ApiResponse<LoginData>, GetUserChannelProfileInput>(
  'users/getUserChannelProfile',
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/c/${input.username}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user channel profile');
    }
  }
);

export const getWatchHistory = createAsyncThunk<ApiResponse<WatchHistoryData>, void>(
  'users/getWatchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/history');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch watch history');
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetError: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // updateAccountDetails
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // refreshAccessToken
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateUserAvatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateUserCoverImage
      .addCase(updateUserCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserCoverImage.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(updateUserCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getUserChannelProfile
      .addCase(getUserChannelProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChannelProfile.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(getUserChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getWatchHistory
      .addCase(getWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWatchHistory.fulfilled, (state, action) => {
        if (state.user) {
          state.user.watchHistory = action.payload.data.watchHistory;
        }
        setSuccessState(state, action.payload);
      })
      .addCase(getWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setUser, resetError } = userSlice.actions;
export default userSlice.reducer;
