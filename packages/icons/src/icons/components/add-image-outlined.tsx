import { Icon as SvgIcon } from './base/svg-icon';
import { Icon as FontIcon } from './base/font-icon';
import svgSource from '../../svg/add-image-outlined.svg';

export type AddImageOutlinedProps = Omit<
  React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>,
  'type'
>;
/**
 * ![add-image-outlined.svg](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiA+PHBhdGggZGF0YS1mb2xsb3ctZmlsbD0iI2ZmZiIgZD0iTTQ0IDI0YTIgMiAwIDEgMC00IDBoNFpNMjQgOGEyIDIgMCAxIDAgMC00djRabTE1IDMySDl2NGgzMHYtNFpNOCAzOVY5SDR2MzBoNFptMzItMTV2MTVoNFYyNGgtNFpNOSA4aDE1VjRIOXY0Wm0wIDMyYTEgMSAwIDAgMS0xLTFINGE1IDUgMCAwIDAgNSA1di00Wm0zMCA0YTUgNSAwIDAgMCA1LTVoLTRhMSAxIDAgMCAxLTEgMXY0Wk04IDlhMSAxIDAgMCAxIDEtMVY0YTUgNSAwIDAgMC01IDVoNFoiIGZpbGw9IiNmZmYiLz48cGF0aCBkYXRhLWZvbGxvdy1zdHJva2U9IiNmMDAiIGQ9Im02IDM1IDEwLjY5My05LjgwMmEyIDIgMCAwIDEgMi42NTMtLjA0NEwzMiAzNm0tNC01IDQuNzczLTQuNzczYTIgMiAwIDAgMSAyLjYxNS0uMTg2TDQyIDMxTTMwIDEyaDEybS02LTZ2MTIiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+)
 *
 * ---
 *
 * 支持最多配置 2 个颜色，按顺序分别为
 * ![#fff](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiA+PHBhdGggZD0iTTI0IDMzQzI4Ljk3MDYgMzMgMzMgMjguOTcwNiAzMyAyNEMzMyAxOS4wMjk0IDI4Ljk3MDYgMTUgMjQgMTVDMTkuMDI5NCAxNSAxNSAxOS4wMjk0IDE1IDI0QzE1IDI4Ljk3MDYgMTkuMDI5NCAzMyAyNCAzM1oiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+)
 * ![#f00](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiA+PHBhdGggZD0iTTI0IDMzQzI4Ljk3MDYgMzMgMzMgMjguOTcwNiAzMyAyNEMzMyAxOS4wMjk0IDI4Ljk3MDYgMTUgMjQgMTVDMTkuMDI5NCAxNSAxNSAxOS4wMjk0IDE1IDI0QzE1IDI4Ljk3MDYgMTkuMDI5NCAzMyAyNCAzM1oiIGZpbGw9IiNmMDAiIHN0cm9rZT0iI2YwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+)
 */
export const AddImageOutlined: React.FC<AddImageOutlinedProps> = (props) => {
  if (props.color) {
    return <SvgIcon type={svgSource} {...props} />;
  }
  return <FontIcon type='heathen-icon-add-image-outlined' {...props} />;
};
