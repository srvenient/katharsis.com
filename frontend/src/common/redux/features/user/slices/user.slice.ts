import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userHttpClient } from '../api/user.http-client';
import { userInfo } from 'os';

export const fetchMe = createAsyncThunk(
  'user/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      return userHttpClient.fetchMe();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null as any | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
