import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authHttpClient } from '../api/auth.http-client';
import { initialState } from '../states/auth.state';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await authHttpClient.login(
        credentials.username,
        credentials.password
      );
      return res;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: Record<string, unknown>, { rejectWithValue }) => {
    try {
      return await authHttpClient.register(data);
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authHttpClient.logout();
});

export const start2faSetup = createAsyncThunk(
  'auth/start2faSetup',
  async (_, { rejectWithValue }) => {
    try {
      return await authHttpClient.start2faSetup();
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const cancel2FASetup = createAsyncThunk(
  'auth/cancel2FASetup',
  async (_, { rejectWithValue }) => {
    try {
      return await authHttpClient.cancel2faSetup();
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const disable2FA = createAsyncThunk(
  'auth/disable2FA',
  async (_, { rejectWithValue }) => {
    try {
      return await authHttpClient.disable2FA();
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const confirm2FASetup = createAsyncThunk(
  'auth/confirm2FASetup',
  async (code: string, { rejectWithValue }) => {
    try {
      return await authHttpClient.confirm2FASetup(code);
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

export const verify2FACode = createAsyncThunk(
  'auth/verify2FACode',
  async (data: { tempToken: string; code: string }, { rejectWithValue }) => {
    try {
      return await authHttpClient.verify2FACode(data.tempToken, data.code);
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
      }
      return rejectWithValue({ status: null, message: error.message });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },
    setTempToken: (state, action: PayloadAction<string | null>) => {
      state.tempToken = action.payload;
      state.requires2FA = !!action.payload; 
    },
    clearTempToken: (state) => {
      state.tempToken = null;
      state.requires2FA = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log('login fulfilled payload', payload);
        if (payload?.['2fa_token']) {
          state.requires2FA = true;
          state.tempToken = payload['2fa_token'];
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = (payload as any)?.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {})
      .addCase(register.fulfilled, (state) => {})
      .addCase(register.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {})
      .addCase(start2faSetup.pending, (state) => {})
      .addCase(start2faSetup.fulfilled, (state, action) => {})
      .addCase(start2faSetup.rejected, (state, action) => {})
      .addCase(cancel2FASetup.pending, (state) => {})
      .addCase(cancel2FASetup.fulfilled, (state) => {})
      .addCase(cancel2FASetup.rejected, (state, action) => {})
      .addCase(confirm2FASetup.pending, (state) => {})
      .addCase(confirm2FASetup.fulfilled, (state) => {})
      .addCase(confirm2FASetup.rejected, (state, action) => {})
      .addCase(disable2FA.pending, (state) => {})
      .addCase(disable2FA.fulfilled, (state) => {})
      .addCase(disable2FA.rejected, (state, action) => {})
      .addCase(verify2FACode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verify2FACode.fulfilled, (state) => {
        state.isLoading = false;
        state.requires2FA = false;
        state.tempToken = null;
      })
      .addCase(verify2FACode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as any)?.message || 'Verification failed';
      });
  },
});

export const { resetAuthState, setTempToken, clearTempToken } = authSlice.actions;

export default authSlice.reducer;
