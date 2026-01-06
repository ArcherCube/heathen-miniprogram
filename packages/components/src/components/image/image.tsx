import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { Image as TaroImage, ImageProps as TaroImageProps, View } from '@tarojs/components';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { clsx } from 'clsx';
import { useState } from 'react';
import { devWarning } from '../../utils/dev-log';
import { useConfig } from '../config-provider';

const DEFAULT_THUMBNAIL_SCALE = 0.1;

type OnLoadEvent = Parameters<NonNullable<TaroImageProps['onLoad']>>[0];

export type ImageProps = {
  /**
   * 使用oss能力处理图片，自动生成缩略图，优先展示缩略图直到原图加载完成
   * - 设置为true时，默认缩放到原图的10%，可传入 0-1 的数字来调整缩略图显示比例
   */
  thumbnail?: number | boolean;
  /** 图片未加载完成时使用的占位符 */
  placeholder?: React.ReactNode;
  /** 加载完成的回调 */
  onLoad?: (event: OnLoadEvent, type: 'thumbnail' | 'source') => void;
} & Omit<TaroImageProps, 'onLoad'> &
  NativeProps;

const defaultProps: Required<Pick<ImageProps, 'showMenuByLongpress' | 'thumbnail'>> = {
  showMenuByLongpress: false,
  thumbnail: false,
};

export const Image: React.FC<ImageProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { thumbnail, src, placeholder, onLoad, ...originImageProps } = props;
  const [sourceLoaded, setSourceLoaded] = useState<boolean>(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);
  const [renderThumbnail, setRenderThumbnail] = useState<boolean>(false);

  const {
    Image: { imageSrcPrefix },
  } = useConfig();

  const fullSrc = useCreation(() => {
    if (!src) return '';

    // 网络链接或本地连接直接使用，否则拼接前缀
    if (/^https?:\/\/.*$/.test(src) || /^(wx)?file:\/\/.*$/.test(src)) {
      return src;
    } else {
      return `${imageSrcPrefix}${src}`;
    }
  }, [src]);

  const thumbnailSrc = useCreation(() => {
    if (!thumbnail) return undefined;
    if (!fullSrc.startsWith('https')) {
      devWarning('Image', 'can not use thumbnail while src is not a oss source.');
      return undefined;
    }

    setRenderThumbnail(true);

    let scaleRate = thumbnail === true ? DEFAULT_THUMBNAIL_SCALE : thumbnail;

    const thumbnailSrcUrlObject = new URL(fullSrc);
    thumbnailSrcUrlObject.searchParams.set('x-oss-process', `image/resize,p_${Math.round(scaleRate * 100)}`);

    return thumbnailSrcUrlObject.toString();
  }, [thumbnail, fullSrc]);

  const handleThumbnailLoaded = useMemoizedFn((event: OnLoadEvent) => {
    setThumbnailLoaded(true);
    onLoad?.(event, 'thumbnail');
  });

  const handleSourceLoaded = useMemoizedFn((event: OnLoadEvent) => {
    setSourceLoaded(true);
    onLoad?.(event, 'source');

    setTimeout(() => {
      setRenderThumbnail(false);
    }, 500);
  });

  return withNativeProps(
    props,
    <View className='heathen-image'>
      {!sourceLoaded && !thumbnailLoaded ? placeholder : null}
      {renderThumbnail && thumbnailSrc ? (
        <TaroImage
          {...originImageProps}
          className={clsx(
            'heathen-image-thumbnail',
            thumbnailLoaded ? 'heathen-image-visible' : 'heathen-image-hidden',
          )}
          /** 避免props的style进入 */
          style={{}}
          src={thumbnailSrc}
          onLoad={handleThumbnailLoaded}
        />
      ) : null}
      <TaroImage
        {...originImageProps}
        className={clsx('heathen-image-source', sourceLoaded ? 'heathen-image-visible' : 'heathen-image-hidden')}
        /** 避免props的style进入 */
        style={{}}
        src={fullSrc}
        onLoad={handleSourceLoaded}
      />
    </View>,
  );
};
