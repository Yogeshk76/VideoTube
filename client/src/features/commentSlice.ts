import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Comment } from '@/types';

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const getVideoComments = createAsyncThunk<Comment[], string>(
  'comments/getVideoComments',
  async (videoId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/${videoId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk<Comment, { videoId: string; content: string }>(
  'comments/addComment',
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/comments/${videoId}`, { content });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

//updateComment

//deleteComment

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideoComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getVideoComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentSlice.reducer; 