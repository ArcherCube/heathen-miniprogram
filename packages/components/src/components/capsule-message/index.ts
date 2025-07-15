import { attachPropertiesToComponent } from '@heathen/utils';
import { CapsuleMessage as OriginCapsuleMessage } from './capsule-message';
import { show } from './method';
import './style';

export type { CapsuleMessageProps } from './capsule-message';
export const CapsuleMessage = attachPropertiesToComponent(OriginCapsuleMessage, {
  show,
});
