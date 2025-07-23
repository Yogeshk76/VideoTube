import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { User } from '@/types/user.types';
import type { UpdateAccountDetailsInput } from '@/types/user.types';

interface userState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  user: {} as User,
  isAuthenticated: false,
  loading: false,
  error: null,
};



export const updateAccountDetails = createAsyncThunk<User, UpdateAccountDetailsInput>(
  'users/updateAccountDetails', async (details, { rejectWithValue }) => {
    try {
      const { data } = await api.patch('/users/update-account', details , {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update account details');
      
    }
  }
)

//updateUserAvatar

//updateUserCoverImage

//getUserChannelProfile

//getWatchHistory

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
}
});