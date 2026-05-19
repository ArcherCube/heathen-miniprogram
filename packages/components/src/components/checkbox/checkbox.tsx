import { View } from '@tarojs/components';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { clsx } from 'clsx';
import { useContext } from 'react';
import { usePropsValue } from '@heathen/hooks';
import { CheckOutlined } from '@heathen/icons';
import { mergeProps, NativeProps, propsList, withNativeProps } from '@heathen/utils';
import { CheckboxGroupContext } from './context';

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  shape?: 'circle' | 'square';
  disabled?: boolean;
  readonly?: boolean;
  name?: any;
} & NativeProps;

const defaultProps: Required<Pick<CheckboxProps, 'defaultChecked' | 'shape' | 'disabled' | 'readonly'>> = {
  defaultChecked: false,
  shape: 'circle',
  disabled: false,
  readonly: false,
};

export const Checkbox: React.FC<CheckboxProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const groupContext = useContext(CheckboxGroupContext);

  const [checked, setChecked] = usePropsValue({
    value: propsList(
      props.checked,
      groupContext.__active && props.name ? groupContext.value.includes(props.name) : undefined,
    ),
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  });

  const disabled = useCreation(
    () => propsList(props.disabled, groupContext.disabled),
    [props.disabled, groupContext.disabled],
  );

  const readonly = useCreation(
    () => propsList(props.readonly, groupContext.readonly),
    [props.readonly, groupContext.readonly],
  );

  const handleGroupChange = useMemoizedFn((newChecked: boolean) => {
    const groupHasSelf = groupContext.value.includes(props.name);
    if (newChecked && !groupHasSelf) {
      groupContext.setValue((currentGroupValue) => {
        return [...currentGroupValue, props.name];
      });
    }
    if (!newChecked && groupHasSelf) {
      const targetIndex = groupContext.value.indexOf(props.name);
      if (targetIndex > -1) {
        groupContext.setValue((currentGroupValue) => {
          const newValue = [...currentGroupValue];
          newValue.splice(targetIndex, 1);
          return newValue;
        });
      }
    }
  });

  const handleChange = useMemoizedFn(() => {
    if (disabled || readonly) {
      return;
    }

    setChecked((current) => {
      const newChecked = !current;

      if (groupContext.__active) {
        if (props.name) {
          handleGroupChange(newChecked);
        } else {
          console.warn('[Checkbox]: Checkbox in Group should define a name.');
        }
      }

      return newChecked;
    });
  });

  return withNativeProps(
    props,
    <View
      className={clsx('heathen-checkbox', `heathen-checkbox-${props.shape}`, {
        'heathen-checkbox-checked': checked,
        'heathen-checkbox-disabled': disabled,
      })}
      onClick={handleChange}
    >
      <View className='heathen-checkbox-icon'>
        <CheckOutlined />
      </View>
      <View className='heathen-checkbox-content'>{props.children}</View>
    </View>,
  );
};
