import { attachPropertiesToComponent } from '@heathen/utils';
import { useForm, useWatch } from 'rc-field-form';
import { Form as OriginForm } from './form';
import { FormItem } from './form-item';
import { FormSubscribe } from './form-subscribe';
import './index.css';

export type FormLayout = 'vertical' | 'horizontal';
export type { FieldData, NamePath, Rule, RuleObject, RuleRender, ValidateMessages } from 'rc-field-form/es/interface';
export type { FormInstance, FormProps } from './form';
export type { FormItemProps } from './form-item';
export type { FormSubscribeProps } from './form-subscribe';

export const Form = attachPropertiesToComponent(OriginForm, {
  Item: FormItem,
  Subscribe: FormSubscribe,
  useForm,
  useWatch,
});
