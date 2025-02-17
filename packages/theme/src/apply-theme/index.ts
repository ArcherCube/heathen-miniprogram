import Taro from '@tarojs/taro';
import { useThrottleFn } from 'ahooks';
import { useLayoutEffect } from 'react';
import { Theme } from '../type';
import { generateColorStyle } from './color';
import { generateComponentsStyle } from './components';

/**
 * 应用主题。
 * - 本质上是在page节点挂载主题的css变量
 */
export const applyTheme = (theme: Theme) => {
  const colorStyle = generateColorStyle(theme);
  const componentsStyle = generateComponentsStyle(theme);

  const pageStyle = {
    ...colorStyle,
    ...componentsStyle,
  };

  Taro.setPageStyle({
    style: {
      cssText: Object.entries(pageStyle)
        .map(([key, value]) => `${key}:${value}`)
        .join(';'),
    },
  });
};

export const useApplyTheme = (theme: Theme) => {
  const currentPages = Taro.getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1];

  const { run: throttleApplyTheme } = useThrottleFn(
    () => {
      applyTheme(theme);
    },
    { wait: 100, leading: true, trailing: true },
  );

  useLayoutEffect(() => {
    throttleApplyTheme();
  }, [currentPage, theme, throttleApplyTheme]);
};
