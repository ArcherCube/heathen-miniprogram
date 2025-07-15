import { generateUUID, getPageId, mergeProps } from '@heathen/utils';
import React from 'react';
import { AdditionalElementManager } from './manager';

export type Controller<P extends {} = {}> = {
  update: (props: Partial<P>) => void;
  destory: () => void;
};

export const appendComponentToPage = <C extends React.FC<any>>(
  Component: C,
  props: React.ComponentProps<C>,
): Controller<React.ComponentProps<C>> => {
  const pageId = getPageId();
  if (!pageId) {
    throw new Error('[appendComponentToPage]: 当前页面未找到');
  }
  const additionalElementManager = AdditionalElementManager.get(pageId);
  if (!additionalElementManager) {
    throw new Error('[appendComponentToPage]: 当前页面未注册额外元素管理器，请延后调用或检查逻辑');
  }

  /** 元素在map中的id，用作唯一标识 */
  const elementId = generateUUID();

  additionalElementManager.updateElementMap((map) => {
    map.set(elementId, <Component {...props} />);
  });
  return {
    update: (newProps: Partial<React.ComponentProps<C>>) => {
      const mergedProps = mergeProps(props, newProps) as React.ComponentProps<C>;
      additionalElementManager.updateElementMap((map) => {
        map.set(elementId, <Component {...mergedProps} />);
      });
    },
    destory: () => {
      additionalElementManager.updateElementMap((map) => {
        map.delete(elementId);
      });
    },
  };
};
