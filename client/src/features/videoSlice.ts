import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Video, ApiResponse, PublishAVideoInput, UpdateVideoInput, DeleteVideoInput, VideoIdInput } from '@/types';
import { setSuccessState } from '@/utils/successState';

interface VideoState {
  isAuthenticated: boolean;
  videos: Video[];
  video: Video | null;
  loading: boolean;
  error: string | null;
  statusCode: number | null;
  message?: string | null;
}

const initialState: VideoState = {
  videos: [],
  video: null,
  loading: false,
  error: null,
  statusCode: null,
  message: null,
  isAuthenticated: false,
};

export const getAllVideos = createAsyncThunk<ApiResponse<Video[]>>(
  'videos/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/videos');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

export const getVideoById = createAsyncThunk<ApiResponse<Video>, VideoIdInput>(
  'videos/getById',
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/videos/${videoId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch video');
    }
  }
);

export const publishAVideo = createAsyncThunk<ApiResponse<Video>, PublishAVideoInput>(
  'videos/publishAVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/videos', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to publish video');
    }
  }
);

export const updateVideo = createAsyncThunk<ApiResponse<Video>, UpdateVideoInput>(
  'videos/updateVideo',
  async ({ videoId, title, description, thumbnail }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/${videoId}`, { title, description, thumbnail }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update video');
    }
  }
);

export const deleteVideo = createAsyncThunk<ApiResponse<string>, DeleteVideoInput>(
  'videos/deleteVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const {data} = await api.delete(`/videos/${videoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete video');
    }
  }
);

export const togglePublishStatus = createAsyncThunk<ApiResponse<Video>, VideoIdInput>(
  'videos/togglePublishStatus',
  async ({ videoId }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/togggle/publish/${videoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle publish status');
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    resetVideoState: (state) => {
  state.video = null;
  state.error = null;
  state.message = null;
  state.statusCode = null;
},
resetError: (state) => {
  state.error = null;
  state.message = null;
  state.statusCode = null;
}

  },
  extraReducers: (builder) => {
    builder
      // ── Get All Videos
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Get Video By ID
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Publish a Video
      .addCase(publishAVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishAVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(publishAVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Update Video
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload.data;
        state.videos = state.videos.map(video => video._id === action.payload.data._id ? action.payload.data : video);
        setSuccessState(state, action.payload);
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Delete Video
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter((video) => video._id !== action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ── Toggle Publish Status
      .addCase(togglePublishStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetVideoState, resetError } = videoSlice.actions;

export default videoSlice.reducer; 