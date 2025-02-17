import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../svg/home-outlined.svg';

export type HomeOutlinedProps = Omit<
  React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>,
  'type'
>;
/**
 * ![home-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiA+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjZmZmIiBkPSJNNDQgNDRWMjBMMjQgNCA0IDIwdjI0aDEyVjI2aDE2djE4aDEyWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkYXRhLWZvbGxvdy1zdHJva2U9IiNmMDAiIGQ9Ik0yNCA0NFYzNCIgc3Ryb2tlPSIjZjAwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=)
 *
 * ---
 *
 * 支持最多配置 2 个颜色，按顺序分别为
 * ![#fff](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiA+PHBhdGggZD0iTTI0IDMzQzI4Ljk3MDYgMzMgMzMgMjguOTcwNiAzMyAyNEMzMyAxOS4wMjk0IDI4Ljk3MDYgMTUgMjQgMTVDMTkuMDI5NCAxNSAxNSAxOS4wMjk0IDE1IDI0QzE1IDI4Ljk3MDYgMTkuMDI5NCAzMyAyNCAzM1oiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+)
 * ![#f00](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiA+PHBhdGggZD0iTTI0IDMzQzI4Ljk3MDYgMzMgMzMgMjguOTcwNiAzMyAyNEMzMyAxOS4wMjk0IDI4Ljk3MDYgMTUgMjQgMTVDMTkuMDI5NCAxNSAxNSAxOS4wMjk0IDE1IDI0QzE1IDI4Ljk3MDYgMTkuMDI5NCAzMyAyNCAzM1oiIGZpbGw9IiNmMDAiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+)
 */
export const HomeOutlined: React.FC<HomeOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} {...props} />;
  }
  return <FontIcon type='heathen-icon-home-outlined' {...props} />;
};
