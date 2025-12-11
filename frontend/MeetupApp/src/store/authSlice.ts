import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/db/User';
import { loginUser, registerUser } from '@/fetching/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await loginUser(credentials.email, credentials.password);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      age: number;
      gender: string;
      description?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Registration failed',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        },
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
