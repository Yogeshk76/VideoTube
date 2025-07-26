import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type {ApiResponse, ChannelStats, Video} from "@/types";
import { setSuccessState } from "@/utils/successState";

interface DashboardState {
  stats: ChannelStats | null;
  videos: Video[];
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: DashboardState = {
  stats: null,
  videos: [],
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};

export const getChannelStats = createAsyncThunk<ApiResponse<ChannelStats>, void>(
  "dashboard/getChannelStats",
  async (_, { rejectWithValue }) => {
    try {
      const {data} = await api.get("/dashboard/stats", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch channel stats");
    }
  }
);

export const getChannelVideos = createAsyncThunk<ApiResponse<Video[]>, void>(
  "dashboard/getChannelVideos",
  async (_, { rejectWithValue }) => {
    try {
      const {data} = await api.get("/dashboard/videos", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch channel videos");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardState: (state) => {
      state.loading = false;
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
    resetErrorState: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // -- Get Channel Stats
      .addCase(getChannelStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
        setSuccessState(state, action.payload);
        state.loading = false;
      })
      .addCase(getChannelStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Get Channel Videos
      .addCase(getChannelVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.videos = action.payload.data;
        setSuccessState(state, action.payload);
        state.loading = false;
      })
      .addCase(getChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDashboardState, resetErrorState } = dashboardSlice.actions;
export default dashboardSlice.reducer;