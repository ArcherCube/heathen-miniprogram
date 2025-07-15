import { View, Form as TaroForm } from '@tarojs/components';
import { mergeProps, NativeProps } from '@heathen/utils';
import classNames from 'clsx';
import type { FormInstance as RCFormInstance, FormProps as RcFormProps } from 'rc-field-form';
import RcForm from 'rc-field-form';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { traverseReactNode } from '../../utils/traverse-react-node';
import { defaultFormContext, FormContext, FormContextType } from './context';

const classPrefix = 'heathen-form';

export type FormInstance = Pick<
  RCFormInstance,
  | 'getFieldValue'
  | 'getFieldsValue'
  | 'getFieldError'
  | 'getFieldsError'
  | 'isFieldTouched'
  | 'isFieldsTouched'
  | 'resetFields'
  | 'setFields'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'submit'
  | 'validateFields'
>;

export type FormProps = Pick<
  RcFormProps,
  | 'form'
  | 'initialValues'
  | 'name'
  | 'preserve'
  | 'validateMessages'
  | 'validateTrigger'
  | 'onFieldsChange'
  | 'onFinish'
  | 'onFinishFailed'
  | 'onValuesChange'
  | 'children'
> &
  NativeProps<'--border-inner' | '--border-top' | '--border-bottom' | '--prefix-width'> &
  Partial<FormContextType> & {
    footer?: ReactNode;
    labelCol?: { flex: React.CSSProperties['flex'] };
    wrapperCol?: { flex: React.CSSProperties['flex'] };
  };

const defaultProps = defaultFormContext;

export const Form = forwardRef<FormInstance, FormProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    disabled,
    labelCol,
    wrapperCol,
    align,
    ...formProps
  } = props;

  const items: ReactNode[] = [];
  traverseReactNode(props.children as ReactNode, (child) => {
    items.push(child);
  });

  return (
    <RcForm
      className={classNames(classPrefix, className)}
      style={style}
      ref={ref as ForwardedRef<RCFormInstance>}
      {...formProps}
      validateMessages={formProps.validateMessages}
      component={TaroForm}
    >
      <FormContext.Provider
        value={{
          name: formProps.name,
          hasFeedback,
          layout,
          disabled,
          labelCol,
          wrapperCol,
          align,
        }}
      >
        {items}
      </FormContext.Provider>
      {footer && <View className={`${classPrefix}-footer`}>{footer}</View>}
    </RcForm>
  );
});
