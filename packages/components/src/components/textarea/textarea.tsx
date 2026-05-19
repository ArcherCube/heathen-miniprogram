import { Textarea as TaroTextarea, TextareaProps as TaroTextareaProps, View } from '@tarojs/components';
import { BaseEventOrig } from '@tarojs/components/types/common';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { clsx } from 'clsx';
import { usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';

export type TextareaProps = {
  readonly?: boolean;
  onChange?(value: string): void;
  maxLength?: number;
  showCount?: boolean;
} & Omit<TaroTextareaProps, 'maxlength' | 'onInput' | 'disableDefaultPadding'> &
  NativeProps;

const defaultProps: Required<Pick<TextareaProps, 'defaultValue' | 'maxLength'>> = {
  defaultValue: '',
  maxLength: -1,
};

export const Textarea: React.FC<TextareaProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const {
    // 提取出来，是因为taro的textarea如果同时指定defaultValue和value，回显逻辑有问题；且usePropsValue本身已经处理了默认值的逻辑。
    defaultValue: _,
    placeholderClass,
    readonly,
    disabled,
    maxLength,
    showCount,
    ...otherProps
  } = props;

  const [value, setValue] = usePropsValue(props);

  const handleInput = useMemoizedFn((event: BaseEventOrig<TaroTextareaProps.onInputEventDetail>) => {
    setValue(event.detail.value);
  });

  return withNativeProps(
    props,
    <View className={clsx('heathen-textarea', { 'heathen-textarea-disabled': disabled })}>
      <TaroTextarea
        {...otherProps}
        className='heathen-textarea-native'
        style={{}}
        placeholderClass={clsx('heathen-textarea-placeholder', placeholderClass)}
        disabled={readonly || disabled}
        maxlength={maxLength}
        value={value}
        onInput={handleInput}
        disableDefaultPadding
      />
      {showCount && maxLength && (
        <View className='heathen-textarea-count'>
          {value.normalize().length}/{maxLength}
        </View>
      )}
    </View>,
  );
};
