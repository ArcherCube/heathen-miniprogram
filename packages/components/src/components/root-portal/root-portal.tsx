import { mergeProps } from '@heathen/utils';
import { createPortal } from '@tarojs/react';
import { document } from '@tarojs/runtime';
import { RouterInfo, useRouter } from '@tarojs/taro';
import { useCreation } from 'ahooks';
import React from 'react';
import { usePage } from '../page/use-page';

export type RootPortalProps = {
  enable?: boolean;
  children?: React.ReactNode;
};

type RouterExtInfo = {
  $taroPath: string;
} & RouterInfo;

const defaultProps: Required<Pick<RootPortalProps, 'enable'>> = {
  enable: true,
};

/**
 * 将子节点渲染到页面最后，效果同React.createPortal。
 * - 主要解决小程序原生 RootPortal 不三不四的功能
 * - 如果页面通过withPage包裹，则渲染位置在withPage产生的page root节点内；否则，渲染位置在taro页面的最后
 */
export const RootPortal: React.FC<RootPortalProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const { rootElementRef } = usePage();

  const router = useRouter() as RouterExtInfo | null;

  const rootElement = useCreation(() => {
    if (props.enable) {
      return rootElementRef?.current ?? document.getElementById(router?.$taroPath);
    }
    return undefined;
  }, [router?.$taroPath, props.enable]);

  if (!props.enable) {
    return props.children;
  }
  if (!rootElement) {
    return <></>;
  }
  return <>{createPortal(props.children, rootElement) as any as React.ReactPortal}</>;
};
