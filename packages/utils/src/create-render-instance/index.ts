import { createRoot } from '@tarojs/react';
import { document } from '@tarojs/runtime';
import React from 'react';
import { mergeProps } from '../merge-props';
import { getTaroRootElement } from './utils';

export type RenderInstanceHandle<T extends object> = {
  update: (diffProps: T) => Promise<boolean>;
  destory: () => Promise<boolean>;
};

export interface RenderInstance<T extends object> {
  /** 在当前页面末尾创建一个元素。会返回用于操作元素的句柄 */
  create: (props?: T) => RenderInstanceHandle<T>;
  /** 销毁所有元素 */
  destoryAll: () => Promise<number>;
  /** 获取当前实例创建元素的数量 */
  getCount: () => number;
}

export const createRenderInstance = <T extends object>(Component: React.FC<T>) => {
  const handleSet = new Set<RenderInstanceHandle<any>>();

  const create = (props?: T) => {
    const view = document.createElement('view');
    const viewRoot = createRoot(view);
    viewRoot.render(React.createElement(Component, props), () => {
      getTaroRootElement().then((rootElement) => {
        rootElement.appendChild(view);
      });
    });

    return {
      update: (diffProps: T) => {
        const newProps = mergeProps(props, diffProps);
        return new Promise((resolve) => {
          viewRoot.render(React.createElement(Component, newProps), () => {
            resolve(true);
          });
        });
      },
      destory: () => {
        return new Promise((resolve) => {
          viewRoot.unmount(() => {
            view.remove();
            resolve(true);
          });
        });
      },
    } satisfies RenderInstanceHandle<T>;
  };

  const destoryAll = () => {
    return Promise.allSettled(
      handleSet.values().map((handler) => {
        return handler.destory();
      }),
    ).then((values) => {
      return values.filter((value) => value.status === 'fulfilled').length;
    });
  };

  const getCount = () => {
    return handleSet.size;
  };

  const instance: RenderInstance<T> = {
    create,
    destoryAll,
    getCount,
  };

  return instance;
};
