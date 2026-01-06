import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { View } from '@tarojs/components';
import useCreation from 'ahooks/es/useCreation';
import { clsx } from 'clsx';
import { Layer, LayerProps } from '../layer';
import { ANIMATION_CONFIG } from './animation';

export type PopupProps = {
  /** 弹出位置 */
  placement?: 'bottom' | 'top' | 'left' | 'right';
  /** 弹出的外侧两角是否圆角 */
  rounded?: boolean;
  children?: React.ReactNode;
} & Pick<LayerProps, 'visible' | 'afterClose' | 'afterShow' | 'onClose' | 'mask' | 'closeOnMaskClick' | 'rootPortal'> &
  NativeProps;

const defaultProps: Required<Pick<PopupProps, 'closeOnMaskClick' | 'placement'>> = {
  closeOnMaskClick: true,
  placement: 'bottom',
};

export const Popup: React.FC<PopupProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { placement, children, className, style, rounded, ...layerProps } = props;

  const animation = useCreation(() => ANIMATION_CONFIG[placement], [placement]);

  return (
    <Layer {...layerProps} animation={animation}>
      {withNativeProps(
        props,
        <View className={clsx('heathen-popup', `heathen-popup-${placement}`, { 'heathen-popup-rounded': rounded })}>
          {children}
        </View>,
      )}
    </Layer>
  );
};
