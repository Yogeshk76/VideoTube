import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { ApiResponse, VideoIdInput, CommentIdInput, TweetIdInput } from '@/types';
import { setSuccessState } from '@/utils/successState';


interface LikeState {
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: LikeState = {
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};

export const toggleVideoLike = createAsyncThunk<ApiResponse<null>, VideoIdInput>(
  'likes/toggleVideoLike',
  async (videoId, { rejectWithValue }) => {
    try {
      const {data} = await api.post(`/likes/toggle/v/${videoId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle video like');
    }
  }
);

export const toggleCommentLike = createAsyncThunk<ApiResponse<null>, CommentIdInput>(
  'likes/toggleCommentLike',
  async (commentId, { rejectWithValue }) => {
    try {
      const {data} = await api.post(`/likes/toggle/c/${commentId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle video like');
    }
  }
);

export const toggleTweetLike = createAsyncThunk<ApiResponse<null>, TweetIdInput>(
  'likes/toggleTweetLike',
  async (tweetId, { rejectWithValue }) => {
    try {
      const {data} = await api.post(`/likes/toggle/t/${tweetId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle video like');
    }
  }
);


export const getLikedVideos = createAsyncThunk<ApiResponse<null>, void>(
  'likes/getLikedVideos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/likes/videos');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch liked videos');
    }
  }
);

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    resetErrorState: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // -- toggle video like
      .addCase(toggleVideoLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        state.loading = false;
        setSuccessState(state, action.payload);
      })
      .addCase(toggleVideoLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- toggle comment like
      .addCase(toggleCommentLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        state.loading = false;
        setSuccessState(state, action.payload);
      })
      .addCase(toggleCommentLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- toggle tweet like
      .addCase(toggleTweetLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTweetLike.fulfilled, (state, action) => {
        state.loading = false;
        setSuccessState(state, action.payload);
      })
      .addCase(toggleTweetLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // -- get liked videos
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        setSuccessState(state, action.payload);
      })
      .addCase(getLikedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer; 
export const { resetErrorState } = likeSlice.actions;