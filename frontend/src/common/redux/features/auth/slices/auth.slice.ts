import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authHttpClient } from '../api/auth.http-client';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authHttpClient.login(
        credentials.username,
        credentials.password
      );
    } catch (error: any) {
      // Handle errors if necessary
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await authHttpClient.register(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authHttpClient.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {})
      .addCase(login.fulfilled, (state) => {})
      .addCase(login.rejected, (state, action) => {})
      .addCase(register.pending, (state) => {})
      .addCase(register.fulfilled, (state) => {})
      .addCase(register.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {});
  },
});

export default authSlice.reducer;
