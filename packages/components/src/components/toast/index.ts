import { attachPropertiesToComponent } from '@heathen/utils';
import './style';
import { fail, show, success } from './method';
import { Toast as ToastItem } from './toast';

export type { ToastProps } from './toast';
export type { ToastMethodOption } from './method';
export const Toast = attachPropertiesToComponent(ToastItem, {
  show,
  success,
  fail,
});
