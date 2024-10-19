import type { InternalNamePath, Meta } from 'rc-field-form/lib/interface';
import React from 'react';
import { FormLayout } from '.';

export type FormContextType = {
  name?: string;
  hasFeedback: boolean;
  layout: FormLayout;
  disabled: boolean;
  // TODO: 临时设计的api，后续需要优化
  labelCol?: { flex: React.CSSProperties['flex'] };
  wrapperCol?: { flex: React.CSSProperties['flex'] };
  align?: React.CSSProperties['textAlign'];
};

export const defaultFormContext: FormContextType = {
  labelCol: { flex: '0 0 160rpx' },
  wrapperCol: { flex: 'auto' },
  align: 'left',
  name: undefined,
  hasFeedback: true,
  layout: 'horizontal',
  disabled: false,
};

export const FormContext = React.createContext<FormContextType>(defaultFormContext);

export type OnSubMetaChange = (meta: Meta & { destroy?: boolean }, namePath: InternalNamePath) => void;
export const NoStyleItemContext = React.createContext<OnSubMetaChange | null>(null);
