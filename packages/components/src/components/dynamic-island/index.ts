import { attachPropertiesToComponent } from '@heathen/utils';
import { DynamicIsland as OriginDynamicIsland } from './dynamic-island';
import { show } from './method';
import './style';

export type { DynamicIslandProps } from './dynamic-island';
export const DynamicIsland = attachPropertiesToComponent(OriginDynamicIsland, {
  show,
});
