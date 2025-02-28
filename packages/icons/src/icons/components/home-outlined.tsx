import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../source/home-outlined.svg';

export type HomeOutlinedProps = Partial<
  Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>
>;
/**
 * ![home-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBzdHJva2U9Im5vbmUiPjxwYXRoIGRhdGEtZm9sbG93LXN0cm9rZT0iIzMzMyIgZD0iTTQ0IDQ0VjIwTDI0IDQgNCAyMHYyNGgxMlYyNmgxNnYxOGgxMloiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjMzMzIiBkPSJNMjQgNDRWMzQiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+)
 *
 * ---
 *
 * 支持最多配置 2 个颜色，按顺序分别为
 * ![#fff](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yNCAzM0MyOC45NzA2IDMzIDMzIDI4Ljk3MDYgMzMgMjRDMzMgMTkuMDI5NCAyOC45NzA2IDE1IDI0IDE1QzE5LjAyOTQgMTUgMTUgMTkuMDI5NCAxNSAyNEMxNSAyOC45NzA2IDE5LjAyOTQgMzMgMjQgMzNaIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==)
 * ![#f00](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yNCAzM0MyOC45NzA2IDMzIDMzIDI4Ljk3MDYgMzMgMjRDMzMgMTkuMDI5NCAyOC45NzA2IDE1IDI0IDE1QzE5LjAyOTQgMTUgMTUgMTkuMDI5NCAxNSAyNEMxNSAyOC45NzA2IDE5LjAyOTQgMzMgMjQgMzNaIiBmaWxsPSIjZjAwIiBzdHJva2U9IiNmMDAiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==)
 */
export const HomeOutlined: React.FC<HomeOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} color={props.color} {...props} />;
  }
  return <FontIcon type='heathen-icon-home-outlined' {...props} />;
};
