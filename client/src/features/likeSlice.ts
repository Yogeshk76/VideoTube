import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';

interface LikeState {
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  loading: false,
  error: null,
};

export const toggleVideoLike = createAsyncThunk<void, string>(
  'likes/toggleVideoLike',
  async (videoId, { rejectWithValue }) => {
    try {
      await api.post(`/likes/toggle/v/${videoId}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle video like');
    }
  }
);

export const toggleCommentLike = createAsyncThunk<void, string>(
  'likes/toggleCommentLike',
  async (commentId, { rejectWithValue }) => {
    try {
      await api.post(`/likes/toggle/c/${commentId}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle comment like');
    }
  }
);

export const toggleTweetLike = createAsyncThunk<void, string>(
  'likes/toggleTweetLike',
  async (tweetId, { rejectWithValue }) => {
    try {
      await api.post(`/likes/toggle/t/${tweetId}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle tweet like');
    }
  }
);

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleVideoLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleVideoLike.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleVideoLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleCommentLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCommentLike.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleCommentLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTweetLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTweetLike.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleTweetLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer; 