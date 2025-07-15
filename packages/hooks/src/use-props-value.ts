import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import useUpdate from 'ahooks/es/useUpdate';
import { SetStateAction, useRef } from 'react';

export type PropsValueOptions<T, D extends any[] = []> = {
  value?: T;
  defaultValue: T;
  onChange?: (v: T, ...otherData: D) => void;
};

export const usePropsValue = <T, D extends any[] = []>(options: PropsValueOptions<T, D>) => {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    stateRef.current = value;
  }

  const setState = useMemoizedFn((v: SetStateAction<T>, ...otherData: D) => {
    const nextValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v;
    if (nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    return onChange?.(nextValue, ...otherData);
  });
  return [stateRef.current, setState] as const;
};
