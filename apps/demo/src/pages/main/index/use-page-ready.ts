import { useReady } from '@tarojs/taro';
import { useSafeState } from 'ahooks';
import { useEffect } from 'react';

export const usePageReady = () => {
  const [pageReady, setPageReady] = useSafeState(false);

  useReady(() => {
    setTimeout(() => {
      setPageReady(true);
    }, 300);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [setPageReady]);

  return { pageReady };
};
