import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Token {
  access: string;
  liveTime: string;
}

interface State {
  isAuth: boolean;
  token: Token;
  updateToken: (token: Token) => void;
  updateAuth: (auth: boolean) => void;
}

export const useAuthStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        isAuth: false,
        token: {
          access: '',
          liveTime: '',
        },

        updateToken: (token) => set((state) => ({ ...state, token })),
        updateAuth: (auth) => set((state) => ({ ...state, isAuth: auth })),
      }),
      {
        name: 'auth',
      },
    ),
  ),
);
