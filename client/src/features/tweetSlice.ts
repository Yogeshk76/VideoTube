import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { Tweet } from '@/types';

interface TweetState {
  tweets: Tweet[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetState = {
  tweets: [],
  loading: false,
  error: null,
};

export const getUserTweets = createAsyncThunk<Tweet[], string>(
  'tweets/getUserTweets',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/tweets/user/${userId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tweets');
    }
  }
);

export const createTweet = createAsyncThunk<Tweet, { content: string }>(
  'tweets/createTweet',
  async ({ content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/tweets', { content });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create tweet');
    }
  }
);

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(getUserTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.tweets.push(action.payload);
      });
  },
});

export default tweetSlice.reducer; 