import Taro from '@tarojs/taro';
import { getElementById } from '../element';

export const getTaroRootElement = () => {
  const currentPages = Taro.getCurrentPages();
  if (currentPages?.length) {
    const currentPage = currentPages[currentPages.length - 1];
    // 获取当前页面根节点
    const path = currentPage.$taroPath;

    return getElementById(path);
  }

  throw new Error('[getTaroRootElement]: get root element fail, currentPages is empty.');
};
