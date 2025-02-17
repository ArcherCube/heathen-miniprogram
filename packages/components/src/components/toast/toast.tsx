import { View } from '@tarojs/components';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Layer, LayerProps } from '../layer';

export type ToastProps = {
  message?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: Extract<LayerProps['mask'], 'none' | 'transparent'>;
} & Pick<LayerProps, 'visible' | 'afterClose' | 'afterShow' | 'onClose' | 'closeOnMaskClick'> &
  NativeProps;

const defaultProps: Required<Pick<ToastProps, 'mask'>> = {
  mask: 'transparent',
};

const animation: LayerProps['animation'] = {
  mask: {
    close: [
      {
        duration: 200,
        ease: 'ease-out',
        style: {
          opacity: 0,
        },
      },
    ],
    show: [
      {
        duration: 300,
        ease: 'ease-out',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  body: {
    close: [
      {
        duration: 200,
        ease: 'ease-out',
        style: {
          opacity: 0,
        },
      },
    ],
    show: [
      {
        duration: 300,
        ease: 'ease-out',
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
