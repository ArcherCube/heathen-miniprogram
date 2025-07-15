import { CheckOutlined, CrossOutlined } from '@heathen/icons';
import { mergeProps } from '@heathen/utils';
import { Page } from '../page';
import { Toast, ToastProps } from './toast';

// toast为单例
const toastHandler: { current: ReturnType<typeof Page.appendComponent<typeof Toast>> | undefined } = {
  current: undefined,
};
const toastTimer: { current: NodeJS.Timeout | undefined } = { current: undefined };

export type ToastMethodOption = Omit<ToastProps, 'visible' | 'rootPortal'> & {
  duration?: number;
};

const defaultOption: Required<Pick<ToastMethodOption, 'duration'>> = {
  duration: 2000,
};

export const show = (o: ToastMethodOption | string) => {
  toastHandler.current?.destory();
  clearTimeout(toastTimer.current);

  const option = mergeProps(defaultOption, typeof o === 'string' ? ({ message: o } satisfies ToastMethodOption) : o);

  const closeTimer = setTimeout(() => {
    handler?.update({
      visible: false,
    });
  }, option.duration);

  const handler = Page.appendComponent(Toast, {
    ...option,
    visible: true,
    onClose: () => {
      handler?.update({
        visible: false,
      });
      clearTimeout(closeTimer);
    },
    afterClose: () => {
      handler?.destory();
      option.afterClose?.();
    },
    rootPortal: {
      enable: false,
    },
  });

  toastHandler.current = handler;
  toastTimer.current = closeTimer;
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
