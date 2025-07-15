import { type Config } from 'tailwindcss';
import { ThemeColor } from './src/theme';

const themeColor: UnionToTuple<ThemeColor> = ['primary', 'black', 'neutral', 'success', 'warning', 'error'] as const;

export default {
  content: ['./src/**/*.{jsx,tsx,ts}'],
  theme: {
    extend: {
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
      colors: themeColor.reduce(
        (colorStore, colorName) => {
          return {
            ...colorStore,
            [colorName]: Array.from({ length: 16 }).reduce<Record<number, string>>((colorIndexStore, _, colorIndex) => {
              return {
                ...colorIndexStore,
                [colorIndex + 1]: `var(--${colorName}-${colorIndex + 1})`,
              };
            }, {}),
          };
        },
        {} as Record<(typeof themeColor)[number], Record<string, string>>,
      ),
      height: {
        'tab-bar': 'var(--tab-bar-height)',
      },
      boxShadow: {
        default: '0 12px 12px 0 rgb(0 0 0 / 5%)',
        'tab-bar': '0 4px 24px 0 rgb(0 0 0 / 8%)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
  },
} satisfies Config;
