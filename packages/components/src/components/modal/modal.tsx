import { View } from '@tarojs/components';
import { CrossOutlined } from '@heathen/icons';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Layer, LayerProps } from '../layer';
import { Action, ActionProps } from './action';

export type ModalProps = {
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  content?: React.ReactNode;
  /** 是否展示右上角的关闭按钮 */
  showCloseButton?: boolean;
  /** 底部的操作列表 */
  actions?: ActionProps[];
  /** 点击操作后是否关闭 */
  closeOnAction?: boolean;
  /** 弹窗尾部内容，会覆盖actions */
  footer?: React.ReactNode;
} & Pick<LayerProps, 'visible' | 'afterClose' | 'afterShow' | 'onClose' | 'mask' | 'closeOnMaskClick' | 'rootPortal'> &
  NativeProps;

const defaultProps: Required<Pick<ModalProps, 'actions' | 'closeOnMaskClick' | 'closeOnAction'>> = {
  actions: [],
  closeOnMaskClick: true,
  closeOnAction: true,
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
          transform: 'scale(0.8)',
        },
      },
    ],
    show: [
      {
        style: {
          opacity: 1,
          transform: 'scale(1,1)',
        },
      },
    ],
  },
};

export const Modal: React.FC<ModalProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { title, content, showCloseButton, actions, footer, closeOnAction, ...layerProps } = props;

  return (
    <Layer {...layerProps} animation={animation}>
      {withNativeProps(
        props,
        <View className='heathen-modal'>
          {title ? <View className='heathen-modal-title'>{title}</View> : null}
          {content ? <View className='heathen-modal-body'>{content}</View> : null}
          {actions.length ? (
            <View className='heathen-modal-footer'>
              {footer ?? (
                <View className='heathen-modal-footer-actions'>
                  {actions.map((action, index) => {
                    return <Action {...action} onClose={props.onClose} closeOnAction={closeOnAction} key={index} />;
                  })}
                </View>
              )}
            </View>
          ) : null}
          {showCloseButton ? (
            <View className='heathen-modal-close-button' onClick={props.onClose}>
              <CrossOutlined />
            </View>
          ) : null}
        </View>,
      )}
    </Layer>
  );
};
