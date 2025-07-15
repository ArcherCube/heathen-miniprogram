import { attachPropertiesToComponent } from '@heathen/utils';
import './style';
import { Toast as ToastItem } from './toast';

import { fail, show, success } from './method';

export type { ToastProps } from './toast';
export type { ToastMethodOption } from './method';
export const Toast = attachPropertiesToComponent(ToastItem, {
  show,
  success,
  fail,
});
