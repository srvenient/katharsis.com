import { User } from '../types/user.types';

export interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};
