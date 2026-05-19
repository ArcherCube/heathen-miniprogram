import { document, TaroElement } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import get from 'lodash-es/get';
import isNil from 'lodash-es/isNil';

const MAX_RETRY_COUNT = 3;
const MAX_RETRY_DURATION = 300;

export const getElementById = (id: string) => {
  return new Promise<TaroElement>((resolve, reject) => {
    let count = 0;
    const timer = setInterval(() => {
      const element = document.getElementById<TaroElement>(id);

      if (element) {
        clearInterval(timer);
        resolve(element);
      }

      ++count;
      if (count >= MAX_RETRY_COUNT) {
        clearInterval(timer);
        reject(new Error('[getElementById]: get element fail.'));
      }
    }, MAX_RETRY_DURATION / MAX_RETRY_COUNT);
  });
};

const MAX_DEPTH = 50;

/**
 * 查询对应ref或指定id的元素的根节点
 */
const getRootInnerElement = async (target: React.RefObject<TaroElement | undefined> | string) => {
  const targetElement = typeof target === 'string' ? await getElementById(target) : target.current;

  if (!targetElement) {
    throw new Error('[getRootInnerElement]: target element is empty.');
  }

  let tmpElement: TaroElement | null = targetElement;

  for (let A = 0; A < MAX_DEPTH; ++A) {
    if (tmpElement?.parentElement?.nodeName === 'root') {
      return tmpElement;
    }
    tmpElement = tmpElement?.parentElement ?? null;
  }

  throw new Error(
    `[getRootInnerElement]: could not find parent element that nodeName is "root" from ${targetElement.uid}.`,
  );
};

/**
 * 获取ref或指定id的元素的选择器
 * - 主要解决taro（微信）的createSelectorQuery在查询目标所在的dom层级超过13层时，单用一个id选择器选不到的问题
 */
export const getSelectorQuery = (target: React.RefObject<TaroElement | undefined> | string): Promise<Taro.NodesRef> => {
  const targetId = typeof target === 'string' ? target : target.current?.uid;

  if (!targetId) {
    throw new Error('[getSelectorQuery]: id is empty.');
  }

  return getRootInnerElement(target).then((rootInnerElement) => {
    const rootInnerElementId = rootInnerElement?.uid;

    const selector = rootInnerElementId ? `#${rootInnerElementId} >>> #${targetId}` : `#${targetId}`;
    return new Promise<Taro.NodesRef>((resolve) => {
      resolve(Taro.createSelectorQuery().select(selector));
    });
  });
};

/**
 * 查询对应ref或指定id的元素的computedStyle。
 */
export const getComputedStyle = <T extends string>(
  target: React.RefObject<TaroElement | undefined> | string,
  styleList: T[],
): Promise<Record<T, string>> => {
  const targetId = typeof target === 'string' ? target : target.current?.uid;

  if (!targetId) {
    throw new Error('[getComputedStyle]: id is empty.');
  }

  return new Promise<Record<T, string>>((resolve, reject) => {
    getSelectorQuery(targetId)
      .then((query) => {
        query
          .fields({ computedStyle: styleList }, (res) => {
            if (!res) {
              throw new Error('[getComputedStyle]: get computed style fail.');
            }
            resolve(res as Record<T, string>);
          })
          .exec();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 查询对应ref或指定id的元素的boundingClientRect
 */
export const getBoundingClientRect = (
  target: React.RefObject<TaroElement | undefined> | string,
): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  const targetId = typeof target === 'string' ? target : target.current?.uid;

  if (!targetId) {
    throw new Error('[getBoundingClientRect]: id is empty.');
  }

  return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve, reject) => {
    getSelectorQuery(targetId)
      .then((query) => {
        query
          .boundingClientRect((res) => {
            if (!res) {
              throw new Error('[getBoundingClientRect]: get bounding client rect fail.');
            }
            resolve(res as Taro.NodesRef.BoundingClientRectCallbackResult);
          })
          .exec();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 查询对应ref或指定id的元素的boundingClientRect
 */
export const getScrollOffset = (
  target: React.RefObject<TaroElement | undefined> | string,
): Promise<Taro.NodesRef.ScrollOffsetCallbackResult> => {
  const targetId = typeof target === 'string' ? target : target.current?.uid;

  if (!targetId) {
    throw new Error('[getScrollOffset]: id is empty.');
  }

  return new Promise<Taro.NodesRef.ScrollOffsetCallbackResult>((resolve, reject) => {
    getSelectorQuery(targetId)
      .then((query) => {
        query
          .scrollOffset((res) => {
            if (!res) {
              throw new Error('[getScrollOffset]: get scroll offset rect fail.');
            }
            resolve(res);
          })
          .exec();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 获取ref或指定id的元素所在区域的滚动元素
 * - 底层通过 scrollOffset 获取 scrollHeight 来判断，这个属性非文档说明，故api本身不稳定，使用时注意 catch
 */
export const getScrollParent = async (target: React.RefObject<TaroElement | undefined> | string) => {
  let currentNode = typeof target === 'string' ? await getElementById(target) : target.current;

  for (let A = 0; A < MAX_DEPTH; ++A) {
    if (!currentNode || currentNode.nodeName === 'root') {
      break;
    }

    const res = await getScrollOffset(currentNode.uid);

    const scrollHeight = get(res, 'scrollHeight');
    if (isNil(scrollHeight)) {
      return Promise.reject(new Error('[getScrollParent]: unable to get scrollHeight.'));
    }
    if (scrollHeight > 0) {
      return currentNode;
    }

    currentNode = currentNode?.parentNode as TaroElement | undefined;
  }

  return Promise.reject(new Error('[getScrollParent]: no scroll parent.'));
};
