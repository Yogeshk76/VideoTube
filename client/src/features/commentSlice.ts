import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Comment, ApiResponse, CommentIdInput, AddCommentInput, UpdateCommentInput } from '@/types';
import { setSuccessState } from '@/utils/successState';

interface CommentState {
  comments: Comment[];
  comment: Comment | null;
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: CommentState = {
  comment: null,
  statusCode: null,
  message: null,
  error: null,
  comments: [],
  loading: false,
};

export const getVideoComments = createAsyncThunk<ApiResponse<Comment[]>, CommentIdInput>(
  'comments/getVideoComments',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk<ApiResponse<Comment>, AddCommentInput>(
  'comments/addComment',
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/comments/${videoId}`, { content }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const updateComment = createAsyncThunk<ApiResponse<Comment>, UpdateCommentInput>(
  'comments/updateComment',
  async ({ _id, content }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/comments/${_id}`, { content }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk<ApiResponse<null>, CommentIdInput>(
  'comments/deleteComment',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/comments/${_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
    resetCommentState: (state) => {
      state.comment = null;
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -Get Video Comments
      .addCase(getVideoComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getVideoComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -Add Comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload.data;
        state.comments.push(action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -Update Comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload.data;
        state.comments = state.comments.map(comment => comment._id === action.payload.data._id ? action.payload.data : comment);
        setSuccessState(state, action.payload);
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment._id !== action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default commentSlice.reducer; 
export const { resetError, resetCommentState } = commentSlice.actions;