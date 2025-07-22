import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { User, Auth } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<Auth, { email?: string; password?: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<User, FormData>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/register', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const updateAccountDetails = createAsyncThunk<User, { username: string; email: string }>(
  'auth/updateAccountDetails',
  async (accountData, { rejectWithValue }) => {
    try {
      const { data } = await api.patch('/users/update-account', accountData);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update account details');
    }
  }
);

export const changeCurrentPassword = createAsyncThunk<void, { oldPassword?: string; newPassword?: string }>(
  'auth/changeCurrentPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      await api.post('/users/change-password', passwordData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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
      })
      .addCase(changeCurrentPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeCurrentPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeCurrentPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer; 