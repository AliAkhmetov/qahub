import { i18n } from '@/i18n';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  theme: string;
  language: string;
  updateLanguage: (language: string) => void;
  updateTheme: (theme: string) => void;
}

export const useSettingsStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        language: 'ru',

        updateTheme: (theme) => set((state) => ({ ...state, theme })),
        updateLanguage: (language) =>
          set((state) => {
            i18n.changeLanguage(language);
            return { ...state, language };
          }),
      }),
      {
        name: 'settings',
      },
    ),
  ),
);
