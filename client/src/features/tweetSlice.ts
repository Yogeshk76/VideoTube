import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Tweet, ApiResponse, TweetIdInput, UserId, CreateTweetInput , UpdateTweetInput} from '@/types';
import { setSuccessState } from '@/utils/successState';

interface TweetState {
  tweets: Tweet[];
  tweet: Tweet | null;
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: TweetState = {
  tweet: null,
  tweets: [],
  loading: false,
  error: null,
  statusCode: null,
  message: null,

};

export const getUserTweets = createAsyncThunk<ApiResponse<Tweet[]>, UserId>(
  'tweets/getUserTweets',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/tweets/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tweets');
    }
  }
);

export const createTweet = createAsyncThunk<ApiResponse<Tweet>, CreateTweetInput>(
  'tweets/createTweet',
  async ( {content} , { rejectWithValue }) => {
    try {
      const { data } = await api.post('/tweets', { content }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create tweet');
    }
  }
);

export const updateTweet = createAsyncThunk<ApiResponse<Tweet>, UpdateTweetInput>(
  'tweets/updateTweet',
  async ({content, _id}, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/tweets/${_id}`, { content }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update tweet');
    }
  }
);

//deleteTweet
export const deleteTweet = createAsyncThunk<ApiResponse<null>, TweetIdInput>(
  'tweets/deleteTweet',
  async ({ tweetId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/tweets/${tweetId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete tweet');
    }
  }
);

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    resetTweetState: (state) => {
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
      // -- Get User Tweets
      .addCase(getUserTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getUserTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Create Tweet
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.push(action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Update Tweet
      .addCase(updateTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.map(tweet =>
          tweet._id === action.payload.data._id ? action.payload.data : tweet
        );
        setSuccessState(state, action.payload);
      })
      .addCase(updateTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Delete Tweet
      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },
});

export default tweetSlice.reducer; 
export const { resetTweetState, resetErrorState } = tweetSlice.actions;