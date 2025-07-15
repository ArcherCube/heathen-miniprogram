import { attachPropertiesToComponent } from '@heathen/utils';
import { Cell as OriginCell } from './cell';
import { CellGroup } from './cell-group';
import './style';

export type { CellProps } from './cell';

export const Cell = attachPropertiesToComponent(OriginCell, {
  Group: CellGroup,
});
