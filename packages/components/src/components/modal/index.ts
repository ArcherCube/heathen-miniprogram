import { attachPropertiesToComponent } from '@heathen/utils';
import './style';
import { confirm, show, alert } from './method';
import { Modal as ModalItem } from './modal';

export type { ModalProps } from './modal';
export type { ModalMethodOption } from './method';
export const Modal = attachPropertiesToComponent(ModalItem, {
  show,
  confirm,
  alert,
});
