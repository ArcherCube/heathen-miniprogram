import Taro from '@tarojs/taro';

/**
 * 获取当前页面的id。
 * - 注：“当前页面”是基于路由，即当前显示的页面
 */
export const getPageId = (): string | undefined => {
  const currentPages = Taro.getCurrentPages();
  return currentPages.length ? currentPages[currentPages.length - 1].$taroPath : undefined;
};
