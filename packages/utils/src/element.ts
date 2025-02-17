import { document, TaroElement } from '@tarojs/runtime';
import Taro from '@tarojs/taro';

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
 * 查询对应ref的根节点
 */
const getRootInnerElement = (ref: React.RefObject<TaroElement | undefined>) => {
  if (!ref.current?.uid) {
    throw new Error('[getRootInnerElement]: id in ref is empty.');
  }

  return getElementById(ref.current.uid).then((targetElement) => {
    let tmpElement: TaroElement | null = targetElement;
    for (let A = 0; A < MAX_DEPTH; ++A) {
      if (tmpElement?.parentElement?.nodeName === 'root') {
        return tmpElement;
      }
      tmpElement = tmpElement?.parentElement ?? null;
    }

    throw new Error(
      `[getRootInnerElement]: could not find parent element that nodeName is "root" from ${ref.current?.uid}.`,
    );
  });
};

/**
 * 获取ref指定元素的选择器
 * - 主要解决taro（微信）的createSelectorQuery在查询目标所在的dom层级超过13层时，单用一个id选择器选不到的问题
 */
export const getSelectorQuery = (ref: React.RefObject<TaroElement | undefined>): Promise<Taro.NodesRef> => {
  return getRootInnerElement(ref).then((rootInnerElement) => {
    const rootInnerElementId = rootInnerElement?.uid;
    const targetId = ref.current?.uid;

    if (!targetId) {
      throw new Error('[getSelectorQuery]: target element has no id.');
    }

    const selector = rootInnerElementId ? `#${rootInnerElementId} >>> #${targetId}` : `#${targetId}`;
    return new Promise<Taro.NodesRef>((resolve) => {
      resolve(Taro.createSelectorQuery().select(selector));
    });
  });
};

/**
 * 查询对应ref的computedStyle。
 */
export const getComputedStyle = <T extends string>(
  ref: React.RefObject<TaroElement | undefined>,
  styleList: T[],
): Promise<Record<T, string>> => {
  return new Promise<Record<T, string>>((resolve, reject) => {
    getSelectorQuery(ref)
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
 * 查询对应ref的boundingClientRect
 */
export const getBoundingClientRect = (
  ref: React.RefObject<TaroElement | undefined>,
): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve, reject) => {
    getSelectorQuery(ref)
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
