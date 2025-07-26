import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Subscription, ApiResponse, ChannelIdInput, GetSubscribedChannelsInput } from '@/types';
import { setSuccessState } from '@/utils/successState';

interface SubscriptionState {
  subscribedChannels: Subscription[]; // Channels current user is subscribed to
  channelSubscribers: Subscription[]; // Users subscribed to my channel
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: SubscriptionState = {
  subscribedChannels: [],
  channelSubscribers: [],
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};

export const toggleSubscription = createAsyncThunk<ApiResponse<null>, ChannelIdInput>(
  'subscriptions/toggleSubscription',
async ({channelId}, { rejectWithValue }) => {
    try {
      const {data} = await api.post(`/subscriptions/c/${channelId}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle subscription');
    }
  }
);

export const getUserChannelSubscribers = 
  createAsyncThunk<ApiResponse<Subscription[]>, ChannelIdInput>(
    'subscriptions/getUserChannelSubscriber', 
    async ({channelId}, {rejectWithValue}) => {
      try {
        const {data} = await api.get(`/subscriptions/c/${channelId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return data;
      } catch (error : any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch Subscribers.')
      }
    }
  )

export const getSubscribedChannels = createAsyncThunk<ApiResponse<Subscription[]>, GetSubscribedChannelsInput>(
  'subscriptions/getSubscribedChannels',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/subscriptions/u/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscribed channels');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.subscribedChannels = [];
      state.channelSubscribers = [];
      state.loading = false;
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
    resetErrorState: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -- Toggle Subscription
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        setSuccessState(state, action.payload);
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Get User Channel Subscribers
      .addCase(getUserChannelSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.channelSubscribers = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getUserChannelSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Get Subscribed Channels
      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedChannels = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getSubscribedChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
      );
  },
});

export default subscriptionSlice.reducer;
export const { resetSubscriptionState, resetErrorState } = subscriptionSlice.actions;