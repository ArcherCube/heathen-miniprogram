import { ITouchEvent, Label, View } from '@tarojs/components';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import classNames from 'clsx';
import { Field, FormInstance } from 'rc-field-form';
import type { FieldProps } from 'rc-field-form/lib/Field';
import FieldContext from 'rc-field-form/lib/FieldContext';
import type { InternalNamePath, Meta } from 'rc-field-form/lib/interface';
import type { FC, MutableRefObject, ReactNode } from 'react';
import React, { useContext, useRef, useState } from 'react';
import { NativeProps, withNativeProps } from '@heathen/utils';
import { devWarning } from '../../utils/dev-log';
import { Cell, type CellProps } from '../cell';
import { FormContext, NoStyleItemContext } from './context';
import { isSafeSetRefComponent, toArray } from './utils';
import type { FormLayout } from './index';

const NAME_SPLIT = '__SPLIT__';

type RenderChildren<Values = any> = (form: FormInstance<Values>) => ReactNode;
type ChildrenType<Values = any> = RenderChildren<Values> | ReactNode;

type RcFieldProps = Omit<FieldProps, 'children'>;

const classPrefix = `heathen-form-item`;

export type FormItemProps = Pick<
  RcFieldProps,
  | 'dependencies'
  | 'valuePropName'
  | 'name'
  | 'rules'
  | 'messageVariables'
  | 'trigger'
  | 'validateTrigger'
  | 'shouldUpdate'
  | 'initialValue'
  | 'getValueFromEvent'
  | 'getValueProps'
  | 'normalize'
  | 'preserve'
  | 'validateFirst'
> &
  Pick<CellProps, 'style' | 'brief' | 'isLink'> & {
    suffix?: React.ReactNode;
    label?: React.ReactNode;
    hasFeedback?: boolean;
    required?: boolean;
    noStyle?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    layout?: FormLayout;
    childElementPosition?: 'normal' | 'right';
    children?: ChildrenType;
    onClick?: (e: ITouchEvent, widgetRef: MutableRefObject<any>) => void;
    labelCol?: { flex: React.CSSProperties['flex'] };
    wrapperCol?: { flex: React.CSSProperties['flex'] };
    align?: React.CSSProperties['textAlign'];
  } & NativeProps<'--gap'>;

interface MemoInputProps {
  value: any;
  update: number;
  children: React.ReactNode;
}

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) => prev.value === next.value && prev.update === next.update,
);

type FormItemLayoutProps = Pick<
  FormItemProps,
  | 'className'
  | 'style'
  | 'required'
  | 'hasFeedback'
  | 'disabled'
  | 'label'
  | 'hidden'
  | 'layout'
  | 'childElementPosition'
  | 'style'
  | 'brief'
  | 'isLink'
  | 'suffix'
  | 'align'
  | 'labelCol'
  | 'wrapperCol'
> & {
  onClick?: (event: ITouchEvent) => void;
  htmlFor?: string;
  errors: string[];
  warnings: string[];
  children: ReactNode;
} & NativeProps<'--gap'>;

const FormItemLayout: FC<FormItemLayoutProps> = (props) => {
  const { label, required, htmlFor, brief, childElementPosition = 'normal' } = props;

  const context = useContext(FormContext);

  const hasFeedback = props.hasFeedback !== undefined ? props.hasFeedback : context.hasFeedback;
  const layout = props.layout || context.layout;

  const labelElement = !!label && (
    <Label className={`${classPrefix}-label`} for={htmlFor}>
      {label}
      {required && <View className={`${classPrefix}-required`}>*</View>}
    </Label>
  );

  const description = hasFeedback && (
    <>
      {props.errors.map((error, index) => (
        <View key={`error-${index}`} className={`${classPrefix}-feedback-error`}>
          {error}
        </View>
      ))}
      {props.warnings.map((warning, index) => (
        <View key={`warning-${index}`} className={`${classPrefix}-feedback-warning`}>
          {warning}
        </View>
      ))}
    </>
  );
  return withNativeProps(
    props,
    <Cell
      title={labelElement}
      brief={brief}
      className={classNames(classPrefix, `${classPrefix}-${layout}`, {
        [`${classPrefix}-hidden`]: props.hidden,
        [`${classPrefix}-has-error`]: props.errors.length,
      })}
      onClick={props.onClick}
      isLink={props.isLink}
      style={
        {
          '--wrapper-align': props.align ?? context.align,
          '--label-flex': props.labelCol?.flex ?? context.labelCol?.flex,
          '--wrapper-flex': props.wrapperCol?.flex ?? context.wrapperCol?.flex,
          '--layout': layout === 'horizontal' ? 'row' : 'column',
        } as Record<string, any>
      }
      rightIcon={props.suffix}
    >
      <View className={classNames(`${classPrefix}-child`, `${classPrefix}-child-position-${childElementPosition}`)}>
        {props.children}
      </View>
      {description}
    </Cell>,
  );
};

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    // 样式相关
    style,
    // FormItem 相关
    label,
    brief,
    hasFeedback,
    name,
    required,
    noStyle,
    hidden,
    layout,
    childElementPosition,
    // Field 相关
    disabled,
    rules,
    children,
    messageVariables,
    trigger = 'onChange',
    validateTrigger = trigger,
    onClick,
    shouldUpdate,
    dependencies,
    isLink,
    suffix,
    labelCol,
    wrapperCol,
    align,
    ...fieldProps
  } = props;

  const formContext = useContext(FormContext);
  const { validateTrigger: contextValidateTrigger } = useContext(FieldContext);
  const notifyParentMetaChange = useContext(NoStyleItemContext);

  const mergedValidateTrigger = validateTrigger ?? contextValidateTrigger ?? trigger;

  const widgetRef = useRef<any>(null);

  const updateRef = useRef(0);
  updateRef.current += 1;

  const [subMetas, setSubMetas] = useState<Record<string, Meta>>({});
  const onSubMetaChange = useMemoizedFn((subMeta: Meta & { destroy?: boolean }, namePath: InternalNamePath) => {
    setSubMetas((prevSubMetas) => {
      const nextSubMetas = { ...prevSubMetas };
      const nameKey = namePath.join(NAME_SPLIT);
      if (subMeta.destroy) {
        delete nextSubMetas[nameKey];
      } else {
        nextSubMetas[nameKey] = subMeta;
      }
      return nextSubMetas;
    });
  });

  const renderLayout = useMemoizedFn((baseChildren: ReactNode, fieldId?: string, meta?: Meta, isRequired?: boolean) => {
    if (noStyle && !hidden) {
      return baseChildren;
    }

    const errors = Object.keys(subMetas).reduce((currentErrors: string[], key: string) => {
      const subErrors = subMetas[key]?.errors ?? [];
      if (subErrors.length) {
        return [...currentErrors, ...subErrors];
      }
      return currentErrors;
    }, meta?.errors ?? []);

    const warnings = Object.keys(subMetas).reduce((currentWarnings: string[], key: string) => {
      const subWarnings = subMetas[key]?.warnings ?? [];
      if (subWarnings.length) {
        return [...currentWarnings, ...subWarnings];
      }
      return currentWarnings;
    }, meta?.warnings ?? []);

    return withNativeProps(
      props,
      <FormItemLayout
        style={style}
        label={label}
        brief={brief}
        required={isRequired}
        disabled={disabled}
        hasFeedback={hasFeedback}
        htmlFor={fieldId}
        errors={errors}
        warnings={warnings}
        onClick={onClick && ((e) => onClick(e, widgetRef))}
        hidden={hidden}
        layout={layout}
        childElementPosition={childElementPosition}
        isLink={isLink}
        suffix={suffix}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        align={align}
      >
        <NoStyleItemContext.Provider value={onSubMetaChange}>{baseChildren}</NoStyleItemContext.Provider>
      </FormItemLayout>,
    );
  });

  const onMetaChange = useMemoizedFn((meta: Meta & { destroy?: boolean }) => {
    if (noStyle && notifyParentMetaChange) {
      const namePath = meta.name;
      notifyParentMetaChange(meta, namePath);
    }
  });

  const isRenderProps = typeof children === 'function';

  let variables: Record<string, string> = {};
  variables.label = typeof label === 'string' ? label : '';
  if (messageVariables) {
    variables = { ...variables, ...messageVariables };
  }

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children) as JSX.Element;
  }

  return (
    <Field
      {...fieldProps}
      name={name}
      shouldUpdate={shouldUpdate}
      dependencies={dependencies}
      rules={rules}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onMetaChange={onMetaChange}
      messageVariables={variables}
    >
      {(control, meta, context) => {
        let childNode: ReactNode = null;

        const isRequired =
          required !== undefined
            ? required
            : rules && rules.some((rule) => !!(rule && typeof rule === 'object' && rule.required));

        const nameList = toArray(name).length && meta ? meta.name : [];
        const fieldId = (nameList.length > 0 && formContext.name ? [formContext.name, ...nameList] : nameList).join(
          '_',
        );

        if (shouldUpdate && dependencies) {
          devWarning('Form.Item', "`shouldUpdate` and `dependencies` shouldn't be used together.");
        }

        if (isRenderProps) {
          if ((shouldUpdate || dependencies) && !name) {
            childNode = (children as RenderChildren)(context);
            if (React.isValidElement(childNode)) {
              childNode = React.cloneElement<any>(childNode, {
                disabled: formContext.disabled,
              });
            }
          } else {
            if (!(shouldUpdate || dependencies)) {
              devWarning('Form.Item', '`children` of render props only work with `shouldUpdate` or `dependencies`.');
            }
            if (name) {
              devWarning('Form.Item', "Do not use `name` with `children` of render props since it's not a field.");
            }
          }

          // not render props
        } else if (dependencies && !name) {
          devWarning('Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
        } else if (React.isValidElement(children)) {
          if (children.props.defaultValue) {
            devWarning(
              'Form.Item',
              '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
            );
          }
          const childProps = {
            ...children.props,
            ...control,
            disabled: formContext.disabled,
          };

          if (isSafeSetRefComponent(children)) {
            childProps.ref = (instance: any) => {
              const originRef = (children as any).ref;
              if (originRef) {
                if (typeof originRef === 'function') {
                  originRef(instance);
                }
                if ('current' in originRef) {
                  originRef.current = instance;
                }
              }
              widgetRef.current = instance;
            };
          }

          if (!childProps.id) {
            childProps.id = fieldId;
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([...toArray(trigger), ...toArray(mergedValidateTrigger)]);

          triggers.forEach((eventName) => {
            childProps[eventName] = (...args: any[]) => {
              control[eventName]?.(...args);
              children.props[eventName]?.(...args);
            };
          });

          childNode = (
            <MemoInput value={control[props.valuePropName || 'value']} update={updateRef.current}>
              {React.cloneElement(children, childProps)}
            </MemoInput>
          );
        } else {
          if (name) {
            devWarning(
              'Form.Item',
              '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
            );
          }
          childNode = children;
        }

        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </Field>
  );
};
