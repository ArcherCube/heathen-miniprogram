import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../svg/up-outlined.svg';

export type UpOutlinedProps = Omit<
  React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>,
  'type'
>;
/**
 * ![up-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiA+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjZmZmIiBkPSJtMTMgMzAgMTItMTIgMTIgMTIiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+)
 */
export const UpOutlined: React.FC<UpOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} {...props} />;
  }
  return <FontIcon type='heathen-icon-up-outlined' {...props} />;
};
