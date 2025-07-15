import Taro from '@tarojs/taro';
import useMount from 'ahooks/es/useMount';
import { useEffect, useState } from 'react';

export const useStorageState = <T = any>(key: string, defaultValue?: T) => {
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
        } catch (_) {
          setValue(defaultValue);
        }
      })
      .catch(() => {
        // 为了不要抛错
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
};
