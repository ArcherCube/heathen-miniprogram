import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import classNames from 'clsx';

type SkeletonVariant = 'rect' | 'circle';

type SkeletonAnimation = 'pulse' | 'wave';

export type SkeletonProps = {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation | false;
} & Omit<ViewProps, 'animation'> &
  NativeProps;

const defaultProps: Required<Pick<SkeletonProps, 'variant' | 'animation'>> = {
  variant: 'rect',
  animation: 'wave',
};

export const Skeleton: React.FC<SkeletonProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const { className, variant, animation, ...restProps } = props;

  return withNativeProps(
    props,
    <View
      className={classNames(
        'heathen-skeleton',
        {
          ['heathen-skeleton-rect']: variant === 'rect',
          ['heathen-skeleton-circle']: variant === 'circle',
          ['heathen-skeleton-pulse']: animation === 'pulse',
          ['heathen-skeleton-wave']: animation === 'wave',
        },
        className,
      )}
      {...restProps}
    />,
  );
};
