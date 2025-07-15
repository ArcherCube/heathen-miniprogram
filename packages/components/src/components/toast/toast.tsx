import { View } from '@tarojs/components';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Layer, LayerProps } from '../layer';

export type ToastProps = {
  message?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: Extract<LayerProps['mask'], 'none' | 'transparent'>;
} & Pick<LayerProps, 'visible' | 'afterClose' | 'afterShow' | 'onClose' | 'closeOnMaskClick' | 'rootPortal'> &
  NativeProps;

const defaultProps: Required<Pick<ToastProps, 'mask'>> = {
  mask: 'transparent',
};

const animation: LayerProps['animation'] = {
  mask: {
    close: [
      {
        style: {
          opacity: 0,
        },
      },
    ],
    show: [
      {
        style: {
          opacity: 1,
        },
      },
    ],
  },
  body: {
    close: [
      {
        style: {
          opacity: 0,
        },
      },
    ],
    show: [
      {
        style: {
          opacity: 1,
        },
      },
    ],
  },
};

export const Toast: React.FC<ToastProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { message, icon, ...layerProps } = props;

  return (
    <Layer {...layerProps} animation={animation}>
      {withNativeProps(
        props,
        <View className='heathen-toast'>
          {props.icon ? <View className='heathen-toast-icon'>{props.icon}</View> : null}
          {props.message ? <View className='heathen-toast-message'>{props.message}</View> : null}
        </View>,
      )}
    </Layer>
  );
};
