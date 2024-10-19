import { Config } from 'tailwindcss';
import { theme as colorConfig } from './theme';

const baseConfig = {
  borderRadius: Array.from({ length: 750 + 1 }).reduce<Record<number, string>>((store, _, index) => {
    return {
      ...store,
      [index]: `${index}rpx`,
    };
  }, {}),
  spacing: Array.from({ length: 750 + 1 }).reduce<Record<number, string>>((store, _, index) => {
    return {
      ...store,
      [index]: `${index}rpx`,
    };
  }, {}),
  fontSize: Array.from({ length: 128 + 1 }).reduce<Record<number, string>>((store, _, index) => {
    return {
      ...store,
      [index]: `${index}rpx`,
    };
  }, {}),
  borderWidth: Array.from({ length: 64 + 1 }).reduce<Record<number, string>>((store, _, index) => {
    return {
      ...store,
      [index]: `${index}rpx`,
    };
  }, {}),
  lineHeight: Array.from({ length: 64 + 1 }).reduce<Record<number, string>>((store, _, index) => {
    return {
      ...store,
      [index]: `${index}rpx`,
    };
  }, {}),
} satisfies Config['theme'];

const theme = { ...baseConfig, ...colorConfig };

export { theme };
