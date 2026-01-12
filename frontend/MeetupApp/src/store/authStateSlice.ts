import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/db/User';
import { api } from './api';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
      }>,
    ) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(api.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, state => {
        state.user = null;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
