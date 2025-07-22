import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { Video } from '@/types';

interface DashboardState {
  stats: any;
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  videos: [],
  loading: false,
  error: null,
};

export const getChannelStats = createAsyncThunk<any, string>(
  'dashboard/getChannelStats',
  async (channelId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/dashboard/stats/${channelId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch channel stats');
    }
  }
);

export const getDashboardVideos = createAsyncThunk<Video[], string>(
  'dashboard/getDashboardVideos',
  async (channelId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/dashboard/videos/${channelId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard videos');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getChannelStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDashboardVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getDashboardVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer; 