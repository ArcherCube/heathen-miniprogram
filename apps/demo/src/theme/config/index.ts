import { theme as defaultTheme } from './default';

export enum THEME_TYPE {
  DEFAULT,
}

export const THEME_TYPE_CONFIG = {
  [THEME_TYPE.DEFAULT]: {
    theme: defaultTheme,
    label: '默认',
    value: THEME_TYPE.DEFAULT,
  },
};
