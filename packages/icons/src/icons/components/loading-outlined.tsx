import svgSource from '../../source/loading-outlined.svg';
import { Icon as FontIcon } from './base/font-icon';
import { Icon as SvgIcon } from './base/svg-icon';

export type LoadingOutlinedProps = Partial<
  Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>
>;
/**
 * ![loading-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBzdHJva2U9Im5vbmUiPjxwYXRoIGRhdGEtZm9sbG93LXN0cm9rZT0iIzMzMyIgZD0iTTI0IDR2NG0xMC0xLjMyLTIgMy40NjRNNDEuMzIgMTRsLTMuNDY0IDJNNDQgMjRoLTRtMS4zMiAxMC0zLjQ2NC0yTTM0IDQxLjMybC0yLTMuNDY0TTI0IDQ0di00bS0xMCAxLjMyIDItMy40NjRNNi42OCAzNGwzLjQ2NC0yTTQgMjRoNE02LjY4IDE0bDMuNDY0IDJNMTQgNi42OGwyIDMuNDY0IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)
 */
export const LoadingOutlined: React.FC<LoadingOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} color={props.color} {...props} />;
  }
  return <FontIcon type='heathen-icon-loading-outlined' {...props} />;
};
