import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import { setSuccessState } from '@/utils/successState';
import type {
  User,
  LoginData,
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  ApiResponse,
} from '@/types';

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


export const loginUser = createAsyncThunk<ApiResponse<LoginData>, LoginInput>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<ApiResponse<LoginData>, RegisterInput>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk<ApiResponse<User>, void>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/current-user');
      return data;
    } catch (error: any) {
      // If it's a 401 error, it means no user is logged in, which is not an error
      if (error.response?.status === 401) {
        return rejectWithValue(null); // Return null instead of error message
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const changeCurrentPassword = createAsyncThunk<void, ChangePasswordInput>(
  'auth/changeCurrentPassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      await api.post('/users/change-password', passwordData, {
        headers: { 'Content-Type': 'application/json' },
      });
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
      state.message = null;
      state.statusCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        setSuccessState(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ── Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        setSuccessState(state, action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ── Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        setSuccessState(state, action.payload);
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        // If payload is null, it means no user is logged in (401), which is not an error
        if (action.payload !== null) {
          state.error = action.payload as string;
        }
      })

      // ── Change Password
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
