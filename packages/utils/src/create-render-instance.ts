import React from 'react';
import Taro from '@tarojs/taro';
import { render, unmountComponentAtNode } from '@tarojs/react';
import { document, TaroRootElement } from '@tarojs/runtime';
import { mergeProps } from './merge-props';

export interface RenderInstance<T extends object> {
  /** 在当前页面末尾创建一个元素。会返回用于销毁的id */
  create: (props?: T) => string | undefined;
  /** 销毁指定id的元素 */
  destory: (id: string) => boolean;
  /** 销毁所有元素 */
  destoryAll: () => number;
  /** 获取当前实例创建元素的数量 */
  getCount: () => number;
}

export interface TransitionConfig {
  /** 过渡动画的持续时间，单位：毫秒 */
  duration?: number;
  /** 过度动画后的回调 */
  after?: () => void;
}

const defaultTransitionConfig: Required<Pick<TransitionConfig, 'duration'>> = {
  duration: 200,
};

type ElementType = ReturnType<typeof document.createElement>;

export const createRenderInstance = <T extends object>(Component: React.FC<T>) => {
  const elementMap = new Map<string, ElementType>();

  const create = (props?: T, config?: TransitionConfig) => {
    const view = document.createElement('view');
    // 获取当前页面对象
    const currentPages = Taro.getCurrentPages();
    if (currentPages?.length) {
      const currentPage = currentPages[currentPages.length - 1];
      // 获取当前页面根节点
      const path = currentPage.$taroPath;
      const pageRoot = document.getElementById<TaroRootElement>(path);
      // 在根节点创建对应的元素
      render(React.createElement(Component, props), view, () => {
        pageRoot?.appendChild(view);
        // 过渡动画
        const transitionConfig = mergeProps(defaultTransitionConfig, config);
        view.setAttribute('style', `opacity:0;`);
        setTimeout(() => {
          view.setAttribute('style', `opacity:1;transition:opacity ${transitionConfig.duration}ms;`);
          setTimeout(() => {
            transitionConfig.after?.();
          }, transitionConfig.duration);
        });
      });

      // 记录弹层id
      const id = `${Math.floor(Math.random() * Math.pow(10, 8))}`;
      elementMap.set(id, view);
      return id;
    }
  };

  const destory = (id: string, config?: TransitionConfig) => {
    const target = elementMap.get(id);
    if (target) {
      // 过渡动画
      const transitionConfig = mergeProps(defaultTransitionConfig, config);
      target.setAttribute('style', `opacity:0;transition:opacity ${transitionConfig.duration}ms;pointer-events: none;`);
      setTimeout(() => {
        unmountComponentAtNode(target);
        target.remove();
        transitionConfig.after?.();
      }, transitionConfig.duration);
      return true;
    } else {
      return false;
    }
  };

  const destoryAll = () => {
    let count = 0;
    Array.from(elementMap.keys()).forEach((id) => {
      if (destory(id)) {
        ++count;
      }
    });
    return count;
  };

  const getCount = () => {
    return elementMap.size;
  };

  const instance: RenderInstance<T> = {
    create,
    destory,
    destoryAll,
    getCount,
  };

  return instance;
};
