import { useMemoizedFn, useUpdate } from 'ahooks';
import { SetStateAction, useRef } from 'react';

export type PropsValueOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (v: T) => void;
};

export const usePropsValue = <T>(options: PropsValueOptions<T>) => {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    stateRef.current = value;
  }

  const setState = useMemoizedFn((v: SetStateAction<T>, forceTrigger = false) => {
    const nextValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v;
    if (!forceTrigger && nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    return onChange?.(nextValue);
  });
  return [stateRef.current, setState] as const;
};
