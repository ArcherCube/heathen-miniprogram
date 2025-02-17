import { attachPropertiesToComponent } from '@heathen/utils';
import './style';
import { UnsafeArea as OriginUnsafeArea, UnsafeAreaBottom, UnsafeAreaTop } from './unsafe-area';

export type { UnsafeAreaProps } from './unsafe-area';

export const UnsafeArea = attachPropertiesToComponent(OriginUnsafeArea, {
  Bottom: UnsafeAreaBottom,
  Top: UnsafeAreaTop,
});
