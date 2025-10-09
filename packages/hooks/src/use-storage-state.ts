import Taro from '@tarojs/taro';
import useMount from 'ahooks/es/useMount';
import { SetStateAction, useEffect, useState } from 'react';

export function useStorageState<T>(key: string): [T | undefined, (v: SetStateAction<T | undefined>) => void];
export function useStorageState<T>(key: string, defaultValue: T): [T, (v: SetStateAction<T>) => void];
export function useStorageState<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  useMount(() => {
    Taro.getStorage({
      key,
    })
      .then((res) => {
        const { data: dataString } = res;
        try {
          const data = JSON.parse(dataString) as T;
          setValue(data);
        } catch {
          setValue(defaultValue);
        }
      })
      .catch(() => {
        setValue(defaultValue);
      });
  });

  useEffect(() => {
    Taro.setStorage({
      key,
      data: JSON.stringify(value),
    });
  }, [value, key]);

  return [value, setValue] as const;
}
