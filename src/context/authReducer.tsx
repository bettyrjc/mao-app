export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated' | 'registered';
  token: string | null;
  errorMessage: string;
  user_id: any | null;
}

export type AuthAction =
  | { type: 'signUp'; payload: string }
  | { type: 'signIn'; payload: { token: string; user_id: any } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user_id: action.payload.user_id,
      };
    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'registered',
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user_id: null,
      };

    default:
      return state;
  }
};
