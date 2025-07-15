import { View } from '@tarojs/components';
import { PropsValueOptions, usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import isNil from 'lodash-es/isNil';
import { SetStateAction } from 'react';
import { CheckboxGroupContext, CheckboxGroupContextType } from './context';

export type CheckboxGroupProps = {
  max?: number;
  disabled?: boolean;
  readonly?: boolean;
  children?: React.ReactNode;
} & Partial<PropsValueOptions<any[]>> &
  NativeProps;

const defaultProps: Required<Pick<CheckboxGroupProps, 'defaultValue' | 'disabled' | 'readonly'>> = {
  defaultValue: [],
  disabled: false,
  readonly: false,
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue(props);

  const handleChange = useMemoizedFn((v: SetStateAction<any[]>) => {
    if (isNil(props.max) || value.length < props.max) {
      setValue(v);
      return;
    }
  });

  const contextValue = useCreation<CheckboxGroupContextType>(() => {
    return {
      value,
      setValue: handleChange,
      readonly: props.readonly,
      disabled: props.disabled,
      __active: true,
    };
  }, [props.readonly, props.disabled, handleChange, value]);

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {withNativeProps(props, <View className='heathen-checkbox-group'>{props.children}</View>)}
    </CheckboxGroupContext.Provider>
  );
};
