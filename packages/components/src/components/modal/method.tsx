import { createRenderInstance, mergeProps } from '@heathen/utils';
import { Modal, ModalProps } from './modal';

const ModalInstance = createRenderInstance(Modal);

export type ModalMethodOption = Omit<ModalProps, 'visible'>;

const defaultOption: Required<Pick<ModalMethodOption, 'closeOnMaskClick'>> = {
  closeOnMaskClick: false,
};

export const show = (o: ModalMethodOption | string) => {
  const option = mergeProps(defaultOption, typeof o === 'string' ? ({} satisfies ModalMethodOption) : o);

  return new Promise<void>((resolve) => {
    const handler = ModalInstance.create({
      ...option,
      visible: true,
      onClose: () => {
        handler?.update({
          visible: false,
        });
      },
      afterClose: () => {
        handler?.destory();
        option.afterClose?.();
        resolve();
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
