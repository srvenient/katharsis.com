export interface AuthState {
  isLoading: boolean;
  error: string | null;
  requires2FA: boolean;
  tempToken: string | null;
}

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  requires2FA: false,
  tempToken: null,
};
