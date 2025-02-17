export type ThemeColor = 'primary' | 'black' | 'neutral' | 'success' | 'warning' | 'error';

export type Theme = {
  colors: Record<ThemeColor, Record<'primary' | number, string>>;
  components: {
    form: {
      disabledOpacity: number;
    };
  };
};
