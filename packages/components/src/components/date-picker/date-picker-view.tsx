import type { PickerViewProps as TaroPickerViewProps } from '@tarojs/components';
import { usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps } from '@heathen/utils';
import { useCreation, useMemoizedFn } from 'ahooks';
import { PickerOptionValue } from '../picker';
import { PickerView } from '../picker/picker-view';
import { generateDateTimeColumns } from './generate-date-time-columns';
import { DatePickerFilter, DateTimeField, RenderLabel } from './type';
import { convertArrayToDate, convertDateToArray } from './utils';

export type DatePickerViewProps = {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date) => void;
  fields?: DateTimeField[];
  min?: Date;
  max?: Date;
  renderLabel?: RenderLabel;
  filter?: DatePickerFilter | undefined;
} & Pick<TaroPickerViewProps, 'indicatorClass' | 'immediateChange'> &
  NativeProps;

const now = new Date();
const defaultProps: Required<Pick<DatePickerViewProps, 'defaultValue' | 'immediateChange' | 'fields' | 'min' | 'max'>> =
  {
    defaultValue: now,
    immediateChange: true,
    fields: ['year', 'month', 'day'],
    min: new Date(new Date().setFullYear(now.getFullYear() - 10)),
    max: new Date(new Date().setFullYear(now.getFullYear() + 10)),
  };

export const DatePickerView: React.FC<DatePickerViewProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const [value, setValue] = usePropsValue<Date | null>({
    value: props.value,
    defaultValue: props.defaultValue ?? null,
  });

  const pickerValue = useCreation(() => {
    return convertDateToArray(value);
  }, [value]);

  const handleChange = useMemoizedFn((val: PickerOptionValue[]) => {
    const date = convertArrayToDate(val as number[]);
    if (date) {
      setValue(date);
      props.onChange?.(date);
    }
  });

  const getColumns = useMemoizedFn((selected: PickerOptionValue[]) => {
    return generateDateTimeColumns({
      selected: selected as number[],
      min: props.min,
      max: props.max,
      fields: props.fields,
      renderLabel: props.renderLabel,
      filter: props.filter,
    });
  });

  return <PickerView {...props} defaultValue={[]} columns={getColumns} value={pickerValue} onChange={handleChange} />;
};
