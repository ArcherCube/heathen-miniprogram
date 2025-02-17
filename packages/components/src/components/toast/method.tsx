import { CheckOutlined, CrossOutlined } from '@heathen/icons';
import { createRenderInstance, RenderInstanceHandle, mergeProps } from '@heathen/utils';
import { Toast, ToastProps } from './toast';

const ToastInstance = createRenderInstance(Toast);
// toast为单例
let toastHandler: RenderInstanceHandle<ToastProps> | undefined;
let toastTimer: NodeJS.Timeout;

export type ToastMethodOption = Omit<ToastProps, 'visible'> & {
  duration?: number;
};

const defaultOption: Required<Pick<ToastMethodOption, 'duration'>> = {
  duration: 2000,
};

export const close = () => {
  clearTimeout(toastTimer);
  return toastHandler?.update({
    visible: false,
  });
};

export const show = (o: ToastMethodOption | string) => {
  toastHandler?.destory();

  const option = mergeProps(defaultOption, typeof o === 'string' ? ({ message: o } satisfies ToastMethodOption) : o);

  toastHandler = ToastInstance.create({
    ...option,
    visible: true,
    onClose: () => {
      close();
    },
    afterClose: () => {
      toastHandler?.destory();
      option.afterClose?.();
    },
  });

  toastTimer = setTimeout(() => {
    close();
  }, option.duration);
};

export const success = (option: Omit<ToastMethodOption, 'icon'> | string) => {
  show({
    ...(typeof option === 'string' ? ({ message: option } satisfies ToastMethodOption) : option),
    icon: <CheckOutlined />,
  });
};

export const fail = (option: Omit<ToastMethodOption, 'icon'> | string) => {
  show({
    ...(typeof option === 'string' ? ({ message: option } satisfies ToastMethodOption) : option),
    icon: <CrossOutlined />,
  });
};
