import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types';

interface AuthState {
  user: LoginResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err: any) {
      if (!err.response) {
        return rejectWithValue('Cannot connect to the server. Make sure the backend is running.');
      }
      return rejectWithValue(
        err.response.data?.error || 'Login failed. Please check your credentials.'
      );
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (err: any) {
      if (!err.response) {
        // Network error — backend is unreachable
        return rejectWithValue('Cannot connect to the server. Make sure the backend is running.');
      }
      return rejectWithValue(
        err.response.data?.error || 'Registration failed. Please try again.'
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Logout failed');
    }
  }
);

export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getMe();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Not authenticated');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    rehydrateUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register — success does NOT set user; the signup page redirects to login
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pantheon_user', JSON.stringify(action.payload));
      }
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pantheon_user');
      }
    });

    // Fetch Me
    builder.addCase(fetchMeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMeThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchMeThunk.rejected, (state) => {
      state.loading = false;
      state.user = null;
    });
  },
});

export const { clearError, clearUser, rehydrateUser } = authSlice.actions;
export default authSlice.reducer;
