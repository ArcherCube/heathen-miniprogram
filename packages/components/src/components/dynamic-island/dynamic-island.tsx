import { View } from '@tarojs/components';
import useCreation from 'ahooks/es/useCreation';
import { clsx } from 'clsx';
import isNil from 'lodash-es/isNil';
import { useLayout } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Layer, LayerProps } from '../layer';

export type DynamicIslandProps = {
  children?: React.ReactNode;
} & Pick<LayerProps, 'visible' | 'afterClose' | 'afterShow' | 'onClose' | 'mask' | 'closeOnMaskClick' | 'rootPortal'> &
  NativeProps;

const defaultProps: Required<Pick<DynamicIslandProps, 'mask'>> = {
  mask: 'none',
};

export const DynamicIsland: React.FC<DynamicIslandProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { children, className, style: propsStyle, ...layerProps } = props;
  const capsuleRect = useLayout()?.menuRect;

  const layerBodyWrapperStyle = useCreation<React.CSSProperties | undefined>(() => {
    if (capsuleRect) {
      return {
        transform: 'none',
        top: `${capsuleRect.top}px`,
        right: `calc(100vw - ${capsuleRect.right}px)`,
        left: 'unset',
        bottom: 'unset',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      };
    }
    return undefined;
  }, [capsuleRect?.right, capsuleRect?.top]);

  const style = useCreation<React.CSSProperties>(() => {
    const capsuleWidth = capsuleRect?.width || 0;
    const capsuleHeight = capsuleRect?.height || 0;
    const capsuleBottom = capsuleRect?.bottom || 0;
    const capsuleLeft = capsuleRect?.left || 0;
    return {
      minHeight: `${capsuleHeight}px`,
      minWidth: `${capsuleWidth}px`,
      maxHeight: `calc(100vh - ${capsuleBottom * 2}px)`,
      maxWidth: `${capsuleLeft}px`,
      borderRadius: capsuleHeight / 2,
    };
  }, [capsuleRect?.height, capsuleRect?.width, capsuleRect?.bottom, capsuleRect?.left]);

  const animation = useCreation<LayerProps['animation']>(() => {
    const capsuleHeight = capsuleRect?.height || 0;
    const capsuleWidth = capsuleRect?.width || 0;
    return {
      body: {
        close: [
          {
            style: {
              width: `${capsuleWidth}px`,
              height: `${capsuleHeight}px`,
              borderRadius: `${capsuleHeight / 2}px`,
              opacity: 0,
            },
          },
        ],
        show: [
          {
            style: (rect) => {
              return {
                width: !isNil(rect?.width) ? `${rect.width}px` : '100%',
                height: !isNil(rect?.height) ? `${rect.height}px` : '100%',
                borderRadius: `${capsuleHeight / 2}px`,
                opacity: 1,
              };
            },
          },
        ],
      },
    };
  }, [capsuleRect.height, capsuleRect.width]);

  return (
    <Layer
      {...layerProps}
      className='heathen-dynamic-island-layer-body'
      animation={animation}
      bodyWrapperStyle={layerBodyWrapperStyle}
    >
      {withNativeProps(
        props,
        <View className={clsx('heathen-dynamic-island')} style={style}>
          {children}
        </View>,
      )}
    </Layer>
  );
};
