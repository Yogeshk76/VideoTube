import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { Video } from '@/types';

interface VideoState {
  videos: Video[];
  video: Video | null;
  loading: boolean;
  error: string | null;
  uploadProgress: number;
}

const initialState: VideoState = {
  videos: [],
  video: null,
  loading: false,
  error: null,
  uploadProgress: 0,
};

export const getAllVideos = createAsyncThunk<Video[]>(
  'videos/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/videos');
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

export const getVideoById = createAsyncThunk<Video, string>(
  'videos/getById',
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/videos/${videoId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch video');
    }
  }
);

export const getChannelVideos = createAsyncThunk<Video[], string>(
  'videos/getChannelVideos',
  async (channelId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/dashboard/videos/${channelId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch channel videos');
    }
  }
);

export const publishAVideo = createAsyncThunk<Video, FormData>(
  'videos/publishAVideo',
  async (videoData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/videos', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setUploadProgress(progress));
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to publish video');
    }
  }
);

export const updateVideo = createAsyncThunk<Video, { videoId: string; title: string; description: string }>(
  'videos/updateVideo',
  async ({ videoId, title, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/videos/${videoId}`, { title, description });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update video');
    }
  }
);

export const deleteVideo = createAsyncThunk<string, string>(
  'videos/deleteVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      await api.delete(`/videos/${videoId}`);
      return videoId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete video');
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChannelVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(publishAVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(publishAVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
        state.uploadProgress = 0;
      })
      .addCase(publishAVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.uploadProgress = 0;
      })
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        if (state.video?.id === action.payload.id) {
          state.video = action.payload;
        }
        state.videos = state.videos.map((video) =>
          video.id === action.payload.id ? action.payload : video
        );
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter((video) => video.id !== action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUploadProgress } = videoSlice.actions;

export default videoSlice.reducer; 