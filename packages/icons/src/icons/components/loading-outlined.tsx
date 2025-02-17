import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../svg/loading-outlined.svg';

export type LoadingOutlinedProps = Omit<
  React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>,
  'type'
>;
/**
 * ![loading-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiA+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjZmZmIiBkPSJNMjQgNHY0bTEwLTEuMzItMiAzLjQ2NE00MS4zMiAxNGwtMy40NjQgMk00NCAyNGgtNG0xLjMyIDEwLTMuNDY0LTJNMzQgNDEuMzJsLTItMy40NjRNMjQgNDR2LTRtLTEwIDEuMzIgMi0zLjQ2NE02LjY4IDM0bDMuNDY0LTJNNCAyNGg0TTYuNjggMTRsMy40NjQgMk0xNCA2LjY4bDIgMy40NjQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+)
 */
export const LoadingOutlined: React.FC<LoadingOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} {...props} />;
  }
  return <FontIcon type='heathen-icon-loading-outlined' {...props} />;
};
