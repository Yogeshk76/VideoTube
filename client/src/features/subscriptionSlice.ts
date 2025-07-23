import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Subscription } from '@/types';

interface SubscriptionState {
  subscribedChannels: Subscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscribedChannels: [],
  loading: false,
  error: null,
};

export const toggleSubscription = createAsyncThunk<void, string>(
  'subscriptions/toggleSubscription',
  async (channelId, { rejectWithValue }) => {
    try {
      await api.post(`/subscriptions/c/${channelId}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle subscription');
    }
  }
);

//getUserChannelSubscribers

export const getSubscribedChannels = createAsyncThunk<Subscription[], string>(
  'subscriptions/getSubscribedChannels',
  async (subscriberId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/subscriptions/u/${subscriberId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscribed channels');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedChannels = action.payload;
      })
      .addCase(getSubscribedChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer; 