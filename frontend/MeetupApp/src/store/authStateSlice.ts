import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/db/User';
import { api } from './api';

interface AuthState {
  user: User | null;
  //   token: string | null;
}

const initialState: AuthState = {
  user: null,
  //   token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      // state.token = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        // token: string
      }>,
    ) => {
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        // state.token = action.payload.token;
      })
      .addMatcher(api.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        // state.token = action.payload.token;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
