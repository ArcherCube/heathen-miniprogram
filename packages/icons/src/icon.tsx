import { theme } from '@heathen/design-token';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Icon as IconParkIcon, IIconProps as IconParkIconProps } from '@icon-park/svg/lib/runtime';
import { Image } from '@tarojs/components';
import { useCreation } from 'ahooks';
import './index.css';
import { convertAllColorToRGB } from './utils/convert';
import svg64 from './utils/svg64';

type GetColor<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}-${GetColor<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type Color = GetColor<typeof theme.colors>;

export type IconProps = {
  /** IconPark的图标源。取值见：https://iconpark.oceanengine.com/official */
  type: IconParkIcon;
  /** 颜色值，可以使用hex或rgb格式，也可以使用theme中定义的主题色 */
  color?: Color | `#${string}` | `rgb(${string})`;
  /** 图标模式，同iconpark的theme */
  mode?: IconParkIconProps['theme'];
} & Omit<IconParkIconProps, 'fill' | 'size' | 'theme'> &
  NativeProps;

const defaultProps: Required<Pick<IconProps, 'color'>> = {
  color: 'black-1',
};

/**
 * 使用IconPark官方图标库的Icon，本质上为图片
 * - 宽、高默认设定为1em，方便通过外层的font-size来控制大小
 * - color属性可以使用`@heathen/design-token`中定义的主题色值，或者hex/rgb颜色值
 * - 可以正常使用 IconPark 提供的 theme、strokeWidth 能力
 * - 通过type传入指定的svg组件来使用，具体见下方例子，其中Right来自IconPark官方图标库：https://iconpark.oceanengine.com/official
 * @example import Icon, { Right } from '@heathen/icons';
 * ```
 * <View style={{fontSize: '12px'}} >
 *   <Icon type={Remind} color='success-1' />
 * </View>
 * ```
 *
 **/
export const Icon = (p: IconProps) => {
  const props = mergeProps(defaultProps, p);
  const { type: OriginSvgComponent, strokeWidth, strokeLinecap, strokeLinejoin, mode, color, ...otherProps } = props;

  const svgBase64 = useCreation(() => {
    return svg64(
      OriginSvgComponent({
        strokeWidth: strokeWidth,
        strokeLinecap: strokeLinecap,
        strokeLinejoin: strokeLinejoin,
        theme: mode,
        fill: convertAllColorToRGB(color),
      }),
    );
  }, [OriginSvgComponent, strokeWidth, strokeLinecap, strokeLinejoin, mode, color]);

  return withNativeProps(
    otherProps,
    <Image
      className='heathen-icon'
      src={svgBase64}
      // @ts-ignore next-line
      alt='icon'
    />,
  );
};
