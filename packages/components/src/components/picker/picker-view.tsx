import type { CommonEventFunction, PickerViewProps as TaroPickerViewProps } from '@tarojs/components';
import { PickerView as TaroPickerView, PickerViewColumn as TaroPickerViewColumn, View } from '@tarojs/components';
import { usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { useEffect, useState } from 'react';
import { PickerColumn, PickerOption, PickerOptionValue } from './type';

export type PickerViewProps = {
  value?: PickerOptionValue[];
  defaultValue?: PickerOptionValue[];
  onChange?: (value: PickerOptionValue[], options: (PickerOption | undefined)[]) => void;
  /** 配置每一列的选项 */
  columns: ((value: PickerOptionValue[]) => PickerColumn[]) | PickerColumn[];
} & Pick<TaroPickerViewProps, 'indicatorClass' | 'immediateChange'> &
  NativeProps;

const defaultProps: Required<Pick<PickerViewProps, 'defaultValue' | 'immediateChange'>> = {
  defaultValue: [],
  immediateChange: true,
};

export const PickerView: React.FC<PickerViewProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue(props);
  const [pickerViewValue, setPickerViewValue] = useState<number[]>();

  const columns = useCreation(() => {
    if (typeof props.columns === 'function') {
      return props.columns(value);
    }
    return props.columns;
  }, [props.columns, value]);

  const handleChange = useMemoizedFn<CommonEventFunction<TaroPickerViewProps.onChangeEventDetail>>((event) => {
    const currentOptions = event.detail.value.map((rowIndex, columnIndex) => {
      return columns[columnIndex][rowIndex];
    });

    setValue(
      currentOptions.map((option) => option?.value),
      currentOptions,
    );
  });

  // 值或列数据变动时，更新到TaroPickerView当前值
  useEffect(() => {
    const newValue = value?.map((indexValue, index) => {
      const targetIndex = columns[index]?.findIndex((option) => option.value === indexValue);
      return targetIndex > -1 ? targetIndex : 0;
    });
    setPickerViewValue(newValue);
  }, [value, columns]);

  return withNativeProps(
    props,
    <TaroPickerView
      {...props}
      defaultValue={[]}
      className='heathen-picker-view'
      indicatorClass='heathen-picker-view-indicator'
      value={pickerViewValue}
      onChange={handleChange}
    >
      {columns.map((column, index) => {
        return (
          <TaroPickerViewColumn key={index} className='heathen-picker-view-column'>
            {column.map((option) => {
              return (
                <View className='heathen-picker-view-column-option' key={option.value}>
                  <View className='heathen-picker-view-column-option-label'>{option.label}</View>
                </View>
              );
            })}
          </TaroPickerViewColumn>
        );
      })}
    </TaroPickerView>,
  );
};
