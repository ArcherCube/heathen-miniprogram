import { attachPropertiesToComponent } from '@heathen/utils';
import { Checkbox as OriginCheckbox } from './checkbox';
import { CheckboxGroup } from './group';
import './style';

export const Checkbox = attachPropertiesToComponent(OriginCheckbox, {
  Group: CheckboxGroup,
});

export type { CheckboxProps } from './checkbox';
export type { CheckboxGroupProps } from './group';
