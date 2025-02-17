import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../svg/up-filled.svg';

export type UpFilledProps = Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>;
/**
 * ![up-filled.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiA+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjZmZmIiBkYXRhLWZvbGxvdy1maWxsPSIjZmZmIiBkPSJtMTIgMjkgMTItMTIgMTIgMTJIMTJaIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)
 */
export const UpFilled: React.FC<UpFilledProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} {...props} />;
  }
  return <FontIcon type='heathen-icon-up-filled' {...props} />;
};
