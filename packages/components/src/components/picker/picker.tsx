import { View } from '@tarojs/components';
import { usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { useCreation, useMemoizedFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import { Popup, PopupProps } from '../popup';
import { PickerView, PickerViewProps } from './picker-view';
import { PickerOption, PickerOptionValue } from './type';
import { RootPortal } from '../root-portal';

export type PickerProps = {
  /** 点击取消/蒙层时的回调 */
  onCancel?: () => void;
  /** 滑动切换时的回调 */
  onSelect?: (value: PickerOptionValue[]) => void;
  children?: ((trigger: () => void, options: (PickerOption | undefined)[]) => React.ReactNode) | React.ReactNode;
  title?: React.ReactNode;
} & PickerViewProps &
  Pick<PopupProps, 'placement' | 'rounded'> &
  NativeProps;

const defaultProps: Required<Pick<PickerProps, 'defaultValue' | 'placement' | 'rounded'>> = {
  defaultValue: [],
  placement: 'bottom',
  rounded: true,
};

export const Picker: React.FC<PickerProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { title, onCancel, children, placement, rounded, className, style, ...pickerViewProps } = props;
  const [value, setValue] = usePropsValue(props);
  const [viewValue, setViewValue] = useState<PickerOptionValue[]>([]);

  const [visible, setVisible] = useState<boolean>(false);

  const columns = useCreation(() => {
    if (typeof props.columns === 'function') {
      return props.columns(value);
    }
    return props.columns;
  }, [props.columns, value]);

  /** 按值获取对应的options */
  const getValueOptions = useMemoizedFn((targetValue: PickerOptionValue[]) => {
    const result = targetValue?.map((indexValue, index) => {
      const targetOption = columns[index]?.find((option) => option.value === indexValue);
      return targetOption;
    });

    return result;
  });

  /** PickerView滑动切换时的回调 */
  const handleSelect = useMemoizedFn((currentViewValue: PickerOptionValue[]) => {
    setViewValue(currentViewValue);
    props.onSelect?.(currentViewValue);
  });

  /** 触发打开picker的回调 */
  const handleOpen = useMemoizedFn(() => {
    setVisible(true);
  });

  /** 触发关闭picker的回调 */
  const handleCancel = useMemoizedFn(() => {
    setVisible(false);
    onCancel?.();
  });

  /** 确定选择数据时的回调 */
  const handleConfirm = useMemoizedFn(() => {
    setValue(viewValue, getValueOptions(viewValue));
    setVisible(false);
  });

  /** 打开后，将当前值给予PickerView；打开状态下，当前值变动，覆盖PickerView的值 */
  useEffect(() => {
    if (visible) {
      setViewValue(
        columns?.map((column, index) => {
          return value[index] ?? column[0]?.value;
        }),
      );
    }
  }, [value, visible, columns]);

  /** 子节点计算（renderProps） */
  const childElement = useCreation(() => {
    if (typeof children === 'function') {
      return children(handleOpen, getValueOptions(value));
    }
    return children;
  }, [children, value, columns]);

  return (
    <>
      {childElement}
      <RootPortal>
        {withNativeProps(
          props,
          <Popup visible={visible} onClose={handleCancel} placement={placement} rounded={rounded}>
            <View className='heathen-picker-popup'>
              <View className='heathen-picker-popup-header'>
                <Button className='heathen-picker-popup-header-cancel' variant='text' onClick={handleCancel}>
                  取消
                </Button>
                <View className='heathen-picker-popup-header-title'>{title}</View>
                <Button
                  className='heathen-picker-popup-header-confirm'
                  variant='text'
                  color='primary'
                  onClick={handleConfirm}
                >
                  确定
                </Button>
              </View>
              <PickerView {...pickerViewProps} value={viewValue} onChange={handleSelect} columns={columns} />
            </View>
          </Popup>,
        )}
      </RootPortal>
    </>
  );
};
