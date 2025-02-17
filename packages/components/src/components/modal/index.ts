import { attachPropertiesToComponent } from '@heathen/utils';
import './style';
import { Modal as ModalItem } from './modal';

import { confirm, show, alert } from './method';

export type { ModalProps } from './modal';
export type { ModalMethodOption } from './method';
export const Modal = attachPropertiesToComponent(ModalItem, {
  show,
  confirm,
  alert,
});
