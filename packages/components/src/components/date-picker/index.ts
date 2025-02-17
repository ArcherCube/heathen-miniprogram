import { attachPropertiesToComponent } from '@heathen/utils';

import { DatePicker as OriginDatePicker } from './date-picker';
import { DatePickerView } from './date-picker-view';

export type { DatePickerProps } from './date-picker';
export type { DatePickerViewProps } from './date-picker-view';
export type { DateTimeField } from './type';

export const DatePicker = attachPropertiesToComponent(OriginDatePicker, {
  View: DatePickerView,
});
