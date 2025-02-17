import { THEMES } from '@/constants/theme';
import { Theme } from '@heathen/theme';
import Taro from '@tarojs/taro';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type ThemeStore = {
  theme: Theme;
  setTheme: (themeName: keyof typeof THEMES) => void;
};

const STORE_KEY = 'THEME_STORE';

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => {
      return {
        theme: THEMES.default,
        setTheme: (themeName) => {
          set({
            theme: THEMES[themeName],
          });
        },
      };
    },
    {
      name: STORE_KEY,
      storage: {
        getItem: (key) => {
          return Taro.getStorage({ key }).then(({ data }) => data);
        },
        setItem: (key, data) => {
          return Taro.setStorage({ key, data });
        },
        removeItem: (key) => {
          return Taro.removeStorage({ key });
        },
      },
    } as PersistOptions<ThemeStore, Pick<ThemeStore, 'theme'>>,
  ),
);
