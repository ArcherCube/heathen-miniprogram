import { usePropsValue } from '@heathen/hooks';
import { CrossOutlined } from '@heathen/icons';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { type ITouchEvent, Input as TaroInput, View } from '@tarojs/components';
import { BaseEventOrig } from '@tarojs/components/types/common';
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import clsx from 'clsx';
import { useState } from 'react';

export type InputAlign = 'left' | 'center' | 'right';

export type InputClear = 'always' | 'focus' | 'disabled';

export type InputProps = {
  readonly?: boolean;
  align?: InputAlign;
  onChange?: (value: string) => void;
  /** 是否允许清空。支持设置清空按钮的显示时机，传true时默认等同于always */
  allowClear?: InputClear | boolean;
  onClear?: (event: ITouchEvent) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
} & Omit<TaroInputProps, 'onInput'> &
  NativeProps;

/** 点了某些别的地方，要处理输入框焦点变化时，延迟的时间 */
const FOCUS_DELAY = 80;

const defaultProps: Required<Pick<InputProps, 'align' | 'allowClear' | 'defaultValue'>> = {
  align: 'left',
  allowClear: 'disabled',
  defaultValue: '',
};

export const Input: React.FC<InputProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const {
    // 提取出来，是因为taro的input如果同时指定defaultValue和value，回显逻辑有问题；且usePropsValue本身已经处理了默认值的逻辑。
    defaultValue: _,
    suffix,
    prefix,
    placeholderClass,
    readonly,
    disabled,
    align,
    allowClear,
    onFocus,
    onBlur,
    onClear,
    ...otherProps
  } = props;
  const [value, setValue] = usePropsValue(props);
  const [focused, setFocused] = useState(false);

  const showClearButton = useCreation(() => {
    if (disabled || !value || !allowClear || allowClear === 'disabled') {
      return false;
    }
    if (typeof allowClear === 'boolean') {
      return allowClear;
    } else {
      return allowClear === 'always' || (allowClear === 'focus' && focused);
    }
  }, [allowClear, disabled, focused, value]);

  const handleAddonClick = useMemoizedFn((event: ITouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setTimeout(() => {
      setFocused(true);
    }, FOCUS_DELAY);
  });

  const handleClear = useMemoizedFn((event: ITouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleAddonClick(event);

    onClear?.(event);
    setValue('');
  });

  const handleInput = useMemoizedFn((event: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    setValue(event.detail.value);
  });

  const handleFocus = useMemoizedFn((event: BaseEventOrig<TaroInputProps.inputForceEventDetail>) => {
    setFocused(true);
    onFocus?.(event);
  });

  const handleBlur = useMemoizedFn((event: BaseEventOrig<TaroInputProps.inputValueEventDetail>) => {
    onBlur?.(event);
    setTimeout(() => {
      setFocused(false);
    }, FOCUS_DELAY);
  });

  return withNativeProps(
    props,
    <View
      className={clsx('heathen-input', `heathen-input-${align}`, {
        ['heathen-input-disabled']: disabled,
      })}
    >
      {prefix ? (
        <View className='heathen-input-prefix' onClick={handleAddonClick}>
          {prefix}
        </View>
      ) : null}
      <TaroInput
        {...otherProps}
        className='heathen-input-native'
        style={{}}
        placeholderClass={clsx(placeholderClass, 'heathen-input-placeholder')}
        disabled={disabled || readonly}
        value={value}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focus={focused}
      />
      {showClearButton ? (
        <View className='heathen-input-clear' onClick={handleClear}>
          <CrossOutlined />
        </View>
      ) : null}
      {suffix ? (
        <View className='heathen-input-suffix' onClick={handleAddonClick}>
          {suffix}
        </View>
      ) : null}
    </View>,
  );
};
