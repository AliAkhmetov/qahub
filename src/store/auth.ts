import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Token {
  access: string;
  liveTime: string;
}

interface State {
  isAuth: boolean;
  userType: string | null;
  token: Token;
  updateToken: (token: Token) => void;
  updateAuth: (auth: boolean, userType?: string | null) => void;
}

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isAuth: false,
        userType: 'user',
        token: {
          access: '',
          liveTime: '',
        },

        updateToken: (token) => set((state) => ({ ...state, token })),
        updateAuth: (auth, userType) => set((state) => ({ ...state, isAuth: auth, userType })),
      }),
      {
        name: 'auth',
      },
    ),
  ),
);
