import { usePropsValue } from '@heathen/hooks';
import { mergeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { PickerOptionValue } from '../picker';
import { Picker } from '../picker/picker';
import { PopupProps } from '../popup';
import { DatePickerViewProps } from './date-picker-view';
import { generateDateTimeColumns } from './generate-date-time-columns';
import { DatePickerFilter, DateTimeField, RenderLabel } from './type';
import { convertArrayToDate, convertDateToArray } from './utils';

export type DatePickerProps = {
  /** 点击取消/蒙层时的回调 */
  onCancel?: () => void;
  children?: ((trigger: () => void, value: Date | null) => React.ReactNode) | React.ReactNode;
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date) => void;
  fields?: DateTimeField[];
  min?: Date;
  max?: Date;
  renderLabel?: RenderLabel;
  filter?: DatePickerFilter | undefined;
  title?: React.ReactNode;
} & DatePickerViewProps &
  Pick<PopupProps, 'placement' | 'rounded'>;

const now = new Date();
const defaultProps: Required<
  Pick<DatePickerProps, 'defaultValue' | 'placement' | 'rounded' | 'min' | 'max' | 'fields'>
> = {
  // TODO: 要确保能有undefined的场景、但是要绕过usePropsValue
  defaultValue: undefined as any,
  placement: 'bottom',
  rounded: true,
  fields: ['year', 'month', 'day'],
  min: new Date(new Date().setFullYear(now.getFullYear() - 10)),
  max: new Date(new Date().setFullYear(now.getFullYear() + 10)),
};

export const DatePicker: React.FC<DatePickerProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const [value, setValue] = usePropsValue<Date | null>({
    value: props.value,
    defaultValue: props.defaultValue ?? null,
  });

  const pickerValue = useCreation(() => {
    return convertDateToArray(value ?? now);
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

  /** 子节点计算（renderProps） */
  const renderChildren = useMemoizedFn((trigger: () => void) => {
    if (typeof props.children === 'function') {
      return props.children(trigger, value);
    }
    return props.children;
  });

  return (
    <Picker {...props} defaultValue={[]} value={pickerValue} onChange={handleChange} columns={getColumns}>
      {renderChildren}
    </Picker>
  );
};
