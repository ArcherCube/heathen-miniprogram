import { Theme, ThemeColor } from '@heathen/theme';
import { type Config } from 'tailwindcss';

const themeColor: UnionToTuple<ThemeColor> = ['primary', 'black', 'neutral', 'success', 'warning', 'error'] as const;

const varThemeColors = themeColor.reduce(
  (colorStore, colorName) => {
    return {
      ...colorStore,
      [colorName]: Array.from({ length: 16 }).reduce<Theme['colors'][ThemeColor]>(
        (colorIndexStore, _, colorIndex) => {
          return {
            ...colorIndexStore,
            [colorIndex + 1]: `var(--${colorName}-${colorIndex + 1})`,
          };
        },
        {} as Theme['colors'][ThemeColor],
      ),
    };
  },
  {} as Theme['colors'],
);

export default {
  content: ['./src/**/*.{jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: varThemeColors,
      borderRadius: Array.from({ length: 750 + 1 }).reduce<Record<number, string>>((store, _, index) => {
        return {
          ...store,
          [index]: `${index}px`,
        };
      }, {}),
      spacing: Array.from({ length: 750 + 1 }).reduce<Record<number, string>>((store, _, index) => {
        return {
          ...store,
          [index]: `${index}px`,
        };
      }, {}),
      fontSize: Array.from({ length: 128 + 1 }).reduce<Record<number, string>>((store, _, index) => {
        return {
          ...store,
          [index]: `${index}px`,
        };
      }, {}),
      borderWidth: Array.from({ length: 64 + 1 }).reduce<Record<number, string>>((store, _, index) => {
        return {
          ...store,
          [index]: `${index}px`,
        };
      }, {}),
      lineHeight: Array.from({ length: 64 + 1 }).reduce<Record<number, string>>((store, _, index) => {
        return {
          ...store,
          [index]: `${index}px`,
        };
      }, {}),
      fontFamily: {
        number: ['DIN\\ Alternate'],
        alimm: ['Alimama\\ ShuHeiTi'],
      },
      height: {
        'tab-bar': '100px',
      },
      boxShadow: {
        default: '0 12px 12px 0 rgb(0 0 0 / 5%)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
  },
} satisfies Config;
