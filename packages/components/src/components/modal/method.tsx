import { mergeProps } from '@heathen/utils';
import { Page } from '../page';
import { Modal, ModalProps } from './modal';

export type ModalMethodOption = Omit<ModalProps, 'visible' | 'rootPortal'>;

const defaultOption: Required<Pick<ModalMethodOption, 'closeOnMaskClick'>> = {
  closeOnMaskClick: false,
};

export const show = (o: ModalMethodOption | string) => {
  const option = mergeProps(defaultOption, typeof o === 'string' ? ({} satisfies ModalMethodOption) : o);

  return new Promise<void>((resolve) => {
    const handler = Page.appendComponent(Modal, {
      ...option,
      visible: true,
      onClose: () => {
        handler?.update({
          visible: false,
        });
      },
      afterClose: () => {
        handler?.destroy();
        option.afterClose?.();
        resolve();
      },
      rootPortal: {
        enable: false,
      },
    });
  });
};

export const confirm = (o: Omit<ModalMethodOption, 'actions'> & { onConfirm?: () => Promise<any> | void }) => {
  const option = mergeProps(defaultOption, o);

  return new Promise<boolean>((resolve) => {
    show({
      ...option,
      actions: [
        {
          children: '取消',
          onAction: () => {
            resolve(false);
          },
        },
        {
          children: '确定',
          color: 'primary',
          onAction: () => {
            if (option.onConfirm) {
              const result = option.onConfirm();
              if (result) {
                return result.then(() => {
                  resolve(true);
                });
              } else {
                resolve(true);
              }
            } else {
              resolve(true);
            }
          },
        },
      ],
    });
  });
};

export const alert = (o: Omit<ModalMethodOption, 'actions'>) => {
  const option = mergeProps(defaultOption, o);

  return new Promise<void>((resolve) => {
    show({
      ...option,
      actions: [
        {
          children: '确定',
          color: 'primary',
          onAction: () => {
            resolve();
          },
        },
      ],
    });
  });
};
