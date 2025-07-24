import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { User, LoginData, ChangePasswordInput, LoginInput, RegisterInput, ApiResponse } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};

export const login = createAsyncThunk<ApiResponse<LoginData>, LoginInput>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<ApiResponse<LoginData>, RegisterInput>(
  'users/registerUser', async (userData, {rejectWithValue}) => {
    try {
      const { data } = await api.post('/users/register', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
      
    }
  }
)

export const getCurrentUser = createAsyncThunk<ApiResponse<User>, void>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/current-user');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const changeCurrentPassword = createAsyncThunk<void, ChangePasswordInput>(
  'auth/changeCurrentPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const {data} = await api.post('/users/change-password', passwordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
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
      state.message = null;
      state.statusCode = null;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Change Password
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
