import { View } from '@tarojs/components';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { useMemoizedFn } from 'ahooks';
import { useLayer, UseLayerOption } from './use-layer';

const maskBackgroundColorConfig = {
  none: undefined,
  transparent: 'transparent',
  black: 'rgba(0,0,0,.7)',
  white: 'rgba(255,255,255,.7)',
};

export type LayerProps = {
  content?: React.ReactNode;
  mask?: keyof typeof maskBackgroundColorConfig;
  closeOnMaskClick?: boolean;
  onClose?: () => void;
} & Pick<UseLayerOption, 'afterClose' | 'afterShow' | 'visible' | 'animation'> &
  NativeProps;

const defaultProps: Required<Pick<LayerProps, 'mask'>> = {
  mask: 'black',
};

export const Layer: React.FC<React.PropsWithChildren<LayerProps>> = (p) => {
  const props = mergeProps(defaultProps, p);

  const { shouldRender, bodyStyle, maskStyle } = useLayer(props);

  const stopPropagation = useMemoizedFn((event) => {
    event?.stopPropagation?.();
  });

  const handleMaskClick = useMemoizedFn(() => {
    if (props.closeOnMaskClick) {
      props.onClose?.();
    }
  });

  if (!shouldRender) return null;
  return withNativeProps(
    props,
    <View className='heathen-layer' onClick={stopPropagation}>
      {props.mask !== 'none' ? (
        <View
          className='heathen-layer-mask'
          onClick={handleMaskClick}
          style={{
            backgroundColor: maskBackgroundColorConfig[props.mask],
            ...maskStyle,
          }}
        />
      ) : null}
      <View className='heathen-layer-body-wrapper'>
        <View className='heathen-layer-body' style={bodyStyle}>
          {props.children}
        </View>
      </View>
    </View>,
  );
};
