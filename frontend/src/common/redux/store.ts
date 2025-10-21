import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/slices/auth.slice';
import userReducer from './features/user/slices/user.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
