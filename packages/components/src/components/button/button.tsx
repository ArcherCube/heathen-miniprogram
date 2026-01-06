import { LoadingOutlined } from '@heathen/icons';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { ITouchEvent, Button as TaroButton, ButtonProps as TaroButtonProps, View } from '@tarojs/components';
import useControllableValue from 'ahooks/es/useControllableValue';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { clsx } from 'clsx';

export type ButtonProps = Omit<TaroButtonProps, 'type' | 'size' | 'plain' | 'onClick'> & {
  shape?: 'rounded' | 'square';
  color?: 'primary' | 'default' | 'danger';
  variant?: 'contained' | 'text' | 'outlined';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: ITouchEvent) => Promise<any> | void;
} & NativeProps;

const defaultProps: Required<Pick<ButtonProps, 'variant' | 'shape' | 'color'>> = {
  shape: 'square',
  variant: 'contained',
  color: 'default',
};

export const Button: React.FC<ButtonProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { shape, variant, disabled, block, color, children } = props;
  const [loading, setLoading] = useControllableValue(props, { valuePropName: 'loading', trigger: '__' });

  const handleClick = useMemoizedFn((event: ITouchEvent) => {
    const result = props.onClick?.(event);

    if (result) {
      setLoading(true);
      result.finally(() => {
        setLoading(false);
      });
    }
  });

  return withNativeProps(
    props,
    <View
      className={clsx(
        'heathen-button',
        `heathen-button-${variant}`,
        `heathen-button-${shape}`,
        `heathen-button-${color}`,
        {
          'heathen-button-disabled': disabled || loading,
          'heathen-button-loading': loading,
          'heathen-button-block': block,
        },
      )}
      hoverClass='heathen-button-active'
    >
      {children}
      <View className='heathen-button-loading-icon'>
        <LoadingOutlined />
      </View>
      <TaroButton
        {...props}
        onClick={handleClick}
        disabled={props.disabled || props.loading}
        style={{ opacity: 0, width: '100%', height: '100%', position: 'absolute', padding: 0, margin: 0 }}
      />
    </View>,
  );
};
