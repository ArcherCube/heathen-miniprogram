import { attachPropertiesToComponent } from '@heathen/utils';
import './style';

import { Picker as OriginPicker } from './picker';
import { PickerView } from './picker-view';

export type { PickerProps } from './picker';
export type { PickerViewProps } from './picker-view';
export type { PickerColumn, PickerOption, PickerOptionValue } from './type';

export const Picker = attachPropertiesToComponent(OriginPicker, {
  View: PickerView,
});
