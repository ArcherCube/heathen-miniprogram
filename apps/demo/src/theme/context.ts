import React, { SetStateAction, useContext } from 'react';
import { THEME_TYPE } from './config';

export type ThemeContextType = {
  currentTheme: THEME_TYPE;
  setCurrentTheme: (state: SetStateAction<THEME_TYPE>) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  currentTheme: THEME_TYPE.DEFAULT,
  setCurrentTheme: () => {
    console.warn('[ThemeContext]: can not use a context outside the provider');
  },
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
