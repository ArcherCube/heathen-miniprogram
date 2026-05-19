import svgSource from '../../source/cross-outlined.svg';
import { Icon as FontIcon } from './base/font-icon';
import { Icon as SvgIcon } from './base/svg-icon';

export type CrossOutlinedProps = Partial<
  Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>
>;
/**
 * ![cross-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBzdHJva2U9Im5vbmUiPjxwYXRoIGRhdGEtZm9sbG93LXN0cm9rZT0iIzMzMyIgZD0ibTE0IDE0IDIwIDIwbS0yMCAwIDIwLTIwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)
 */
export const CrossOutlined: React.FC<CrossOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} color={props.color} {...props} />;
  }
  return <FontIcon type='heathen-icon-cross-outlined' {...props} />;
};
