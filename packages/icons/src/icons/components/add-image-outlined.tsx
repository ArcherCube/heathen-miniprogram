import svgSource from '../../source/add-image-outlined.svg';
import { Icon as FontIcon } from './base/font-icon';
import { Icon as SvgIcon } from './base/svg-icon';

export type AddImageOutlinedProps = Partial<
  Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>
>;
/**
 * ![add-image-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBzdHJva2U9Im5vbmUiPjxwYXRoIGRhdGEtZm9sbG93LWZpbGw9IiMzMzMiIGQ9Ik00NCAyNGEyIDIgMCAxIDAtNCAwaDRaTTI0IDhhMiAyIDAgMSAwIDAtNHY0Wm0xNSAzMkg5djRoMzB2LTRaTTggMzlWOUg0djMwaDRabTMyLTE1djE1aDRWMjRoLTRaTTkgOGgxNVY0SDl2NFptMCAzMmExIDEgMCAwIDEtMS0xSDRhNSA1IDAgMCAwIDUgNXYtNFptMzAgNGE1IDUgMCAwIDAgNS01aC00YTEgMSAwIDAgMS0xIDF2NFpNOCA5YTEgMSAwIDAgMSAxLTFWNGE1IDUgMCAwIDAtNSA1aDRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZGF0YS1mb2xsb3ctc3Ryb2tlPSIjMzMzIiBkPSJtNiAzNSAxMC42OTMtOS44MDJhMiAyIDAgMCAxIDIuNjUzLS4wNDRMMzIgMzZtLTQtNSA0Ljc3My00Ljc3M2EyIDIgMCAwIDEgMi42MTUtLjE4Nkw0MiAzMU0zMCAxMmgxMm0tNi02djEyIiBzdHJva2U9IiNmMDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)
 *
 * ---
 *
 * 支持最多配置 2 个颜色，按顺序分别为
 * ![#fff](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yNCAzM0MyOC45NzA2IDMzIDMzIDI4Ljk3MDYgMzMgMjRDMzMgMTkuMDI5NCAyOC45NzA2IDE1IDI0IDE1QzE5LjAyOTQgMTUgMTUgMTkuMDI5NCAxNSAyNEMxNSAyOC45NzA2IDE5LjAyOTQgMzMgMjQgMzNaIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==)
 * ![#f00](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yNCAzM0MyOC45NzA2IDMzIDMzIDI4Ljk3MDYgMzMgMjRDMzMgMTkuMDI5NCAyOC45NzA2IDE1IDI0IDE1QzE5LjAyOTQgMTUgMTUgMTkuMDI5NCAxNSAyNEMxNSAyOC45NzA2IDE5LjAyOTQgMzMgMjQgMzNaIiBmaWxsPSIjZjAwIiBzdHJva2U9IiNmMDAiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==)
 */
export const AddImageOutlined: React.FC<AddImageOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} color={props.color} {...props} />;
  }
  return <FontIcon type='heathen-icon-add-image-outlined' {...props} />;
};
