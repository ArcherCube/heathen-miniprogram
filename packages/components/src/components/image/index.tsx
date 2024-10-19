import { Image as TaroImage, ImageProps as TaroImageProps } from '@tarojs/components';
import { useCreation } from 'ahooks';
import { useConfig } from '../config-provider';

export type ImageProps = TaroImageProps;

export const Image: React.FC<ImageProps> = (props) => {
  const { imageSrcPrefix } = useConfig();

  const mergedSrc = useCreation(() => {
    // 网络链接直接使用，否则拼接前缀
    if (/^https?:\/\/.*&/.test(props.src)) {
      return props.src;
    } else {
      return `${imageSrcPrefix}${props.src}`;
    }
  }, [props.src]);

  return <TaroImage {...props} src={mergedSrc} />;
};
