import Taro from '@tarojs/taro';
import { useMemoizedFn, useMount } from 'ahooks';
import { useState } from 'react';

export type UseStorageInfoResult = {
  /** 当前缓存大小，单位：KB */
  size: number;
  /** 清除缓存 */
  clear: () => Promise<void>;
};

export const useStorageInfo = (): UseStorageInfoResult => {
  const [size, setSize] = useState<number>(0);

  const refreshStorage = useMemoizedFn(() => {
    Taro.getStorageInfo({
      success: (info) => {
        setSize(info.currentSize);
      },
    });
  });

  /** 进入时获取缓存大小 */
  useMount(() => {
    refreshStorage();
  });

  /** 清除缓存 */
  const clear = useMemoizedFn(() => {
    return new Promise<void>((resolve, reject) => {
      Taro.clearStorage({
        success: () => {
          refreshStorage();
          resolve();
        },
        fail: (res) => {
          reject(res);
        },
      });
    });
  });

  return {
    clear,
    size,
  };
};
