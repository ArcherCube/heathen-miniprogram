import { theme } from '@heathen/design-token';

const hexRegExp = /^#([0-9A-Za-z]{3}|[0-9A-Za-z]{6})$/;

/** 转换hex为rgb */
const convertHexToRGB = (color: string) => {
  // 不是hex的直接返回原始值
  if (!hexRegExp.test(color)) {
    return color;
  }
  const rgb: number[] = [];

  color = color.slice(1);

  if (color.length === 3) {
    color = color.replace(/(.)/g, '$1$1');
  }

  color.replace(/../g, (meta) => {
    rgb.push(parseInt(meta, 0x10));
    return color;
  });

  return 'rgb(' + rgb.join(',') + ')';
};

/** 转换颜色字符串为rgb模式 */
const convertColorToRGB = (color: string) => {
  let hex = color;

  // 能从theme中解析到的，获取对应的hex
  const [themeColorName, num] = color.split('-');
  const themeColor = (theme.colors as any)[themeColorName]?.[num] as string;
  if (themeColor) {
    hex = themeColor;
  }

  return convertHexToRGB(hex);
};

/** 转换若干个颜色字符串为rgb模式 */
export const convertAllColorToRGB = (color: string[] | string) => {
  if (typeof color === 'string') {
    return convertColorToRGB(color);
  } else {
    return color.map(function (item) {
      return convertColorToRGB(item);
    });
  }
};
