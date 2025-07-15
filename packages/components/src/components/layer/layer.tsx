import { View } from '@tarojs/components';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { RootPortal, RootPortalProps } from '../root-portal';
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
  rootPortal?: RootPortalProps;
  /** 弹层主体的style，一般用于调整layer的位置（默认居中） */
  bodyWrapperStyle?: React.CSSProperties;
} & Pick<UseLayerOption, 'afterClose' | 'afterShow' | 'visible' | 'animation' | 'destoryOnClose'> &
  NativeProps;

const defaultProps: Required<Pick<LayerProps, 'mask'>> = {
  mask: 'black',
};

export const Layer: React.FC<React.PropsWithChildren<LayerProps>> = (p) => {
  const props = mergeProps(defaultProps, p);

  const { shouldRender, bodyStyle, maskStyle, layerStyle, bodyRef } = useLayer(props);

  const stopPropagation = useMemoizedFn((event) => {
    event?.stopPropagation?.();
  });

  const handleMaskClick = useMemoizedFn(() => {
    if (props.closeOnMaskClick) {
      props.onClose?.();
    }
  });

  if (!shouldRender) return null;
  return (
    <RootPortal {...props.rootPortal}>
      {withNativeProps(
        props,
        <View className='heathen-layer' style={layerStyle} onClick={stopPropagation}>
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
          <View className='heathen-layer-body-wrapper' style={props.bodyWrapperStyle}>
            <View className='heathen-layer-body' style={bodyStyle} ref={bodyRef}>
              {props.children}
            </View>
          </View>
        </View>,
      )}
    </RootPortal>
  );
};
