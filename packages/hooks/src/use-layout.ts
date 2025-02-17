import Taro from '@tarojs/taro';
import { mergeProps } from '@heathen/utils';
import { useLayoutEffect, useState } from 'react';

type MenuRect = {
  width?: number;
  height?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type Layout = {
  /** 右上角胶囊菜单的尺寸 */
  menuRect: MenuRect;
  /** 导航栏的高度（总高度） */
  navigationBarHeight: number;
  /** 导航栏的高度中额外的 padding */
  navigationBarPaddingY: number;
  /** 手机状态栏的高度 */
  statusBarHeight: number;
  /** 屏幕宽度 */
  screenWidth: number;
  /** 屏幕高度 */
  screenHeight: number;
  /** 上方非安全区高度 */
  unsafeAreaTop: number;
  /** 下方非安全区高度 */
  unsafeAreaBottom: number;
};

const defaultMenuRect: Required<MenuRect> = { width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 };

const getLayout = () => {
  const { statusBarHeight = 0, screenHeight, screenWidth, safeArea } = Taro.getWindowInfo();
  const menuRect = Taro.getMenuButtonBoundingClientRect();

  const navigationBarPaddingY = menuRect.top - statusBarHeight;
  const navigationBarHeight = navigationBarPaddingY * 2 + menuRect.height + statusBarHeight;

  const layout: Layout = {
    navigationBarHeight,
    navigationBarPaddingY,
    statusBarHeight,
    menuRect: mergeProps(defaultMenuRect, menuRect),
    screenHeight,
    screenWidth,
    unsafeAreaTop: safeArea?.top ?? 0,
    unsafeAreaBottom: screenHeight - (safeArea?.bottom ?? 0),
  };
  return layout;
};

/** 获取布局信息（注意 number 的单位都是 px） */
export const useLayout = () => {
  const [layout, setLayout] = useState<Layout>();

  useLayoutEffect(() => {
    setLayout(getLayout());
  }, []);

  return layout;
};
