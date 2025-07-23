import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { User, LoginResponse, ChangePasswordInput, LoginInput, UpdateAccountDetailsInput, RegisterInput } from '@/types';

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

export const login = createAsyncThunk<LoginResponse, LoginInput>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<LoginResponse, RegisterInput>(
  'users/registerUser', async (userData, {rejectWithValue}) => {
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
)

export const getCurrentUser = createAsyncThunk<User>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/current-user');
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const changeCurrentPassword = createAsyncThunk<void, ChangePasswordInput>(
  'auth/changeCurrentPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      await api.post('/users/change-password', passwordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return;
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
    resetError: (state) => {
      state.error = null;
    }

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

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer; 