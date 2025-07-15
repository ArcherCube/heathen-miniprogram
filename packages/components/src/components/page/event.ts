import { TaroElement } from '@tarojs/runtime';
import { EventBus } from '@heathen/utils';
import { useMemoizedFn } from 'ahooks';
import { useEffect } from 'react';

export enum PAGE_EVENT_TYPE {
  MOUNT = 'mount',
  UNMOUNT = 'unmount',
}

type PageEventMap = {
  [PAGE_EVENT_TYPE.MOUNT]: { pageRef: React.RefObject<TaroElement> };
  [PAGE_EVENT_TYPE.UNMOUNT]: {};
};

export const pageEvent = new EventBus<PageEventMap>();

export const usePageMount = (callback: (payload: { pageRef: React.RefObject<TaroElement> }) => void) => {
  const memoizedCallback = useMemoizedFn(callback);

  useEffect(() => {
    pageEvent.on(PAGE_EVENT_TYPE.MOUNT, memoizedCallback);

    return () => {
      pageEvent.off(PAGE_EVENT_TYPE.MOUNT, memoizedCallback);
    };
  }, [memoizedCallback]);
};

export const usePageUnmount = (callback: () => void) => {
  const memoizedCallback = useMemoizedFn(callback);

  useEffect(() => {
    pageEvent.on(PAGE_EVENT_TYPE.UNMOUNT, memoizedCallback);

    return () => {
      pageEvent.off(PAGE_EVENT_TYPE.UNMOUNT, memoizedCallback);
    };
  }, [memoizedCallback]);
};
