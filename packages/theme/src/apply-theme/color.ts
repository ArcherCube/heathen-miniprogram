import { Theme } from '../type';

export const generateColorStyle = (theme: Theme) => {
  // 颜色
  const colorStyle = Object.entries(theme.colors).reduce<React.CSSProperties>((allStyle, [colorName, colorConfig]) => {
    return {
      ...allStyle,
      ...Object.entries(colorConfig).reduce<React.CSSProperties>((oneColorStyle, [colorIndex, colorValue]) => {
        return {
          ...oneColorStyle,
          [`--${colorName}-${colorIndex}`]: colorValue,
        };
      }, {}),
    };
  }, {});

  return colorStyle;
};
