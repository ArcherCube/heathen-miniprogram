export type ThemeColor = 'primary' | 'black' | 'neutral' | 'success' | 'warning' | 'error';

export type Theme = {
  colors: Record<ThemeColor, Record<number | string, string>>;
  size: {
    tabBarHeight: string;
  };
};
