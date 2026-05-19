import { View } from '@tarojs/components';
import { clsx } from 'clsx';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';

export type UnsafeAreaProps = {
  position?: 'bottom' | 'top';
} & NativeProps;

const defaultProps: Required<Pick<UnsafeAreaProps, 'position'>> = {
  position: 'bottom',
};

export const UnsafeArea: React.FC<UnsafeAreaProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  return withNativeProps(
    props,
    <View className={clsx('heathen-unsafe-area', `heathen-unsafe-area-${props.position}`)} />,
  );
};

export const UnsafeAreaBottom: React.FC<Omit<UnsafeAreaProps, 'position'>> = (props) => {
  return <UnsafeArea {...props} position='bottom' />;
};

export const UnsafeAreaTop: React.FC<Omit<UnsafeAreaProps, 'position'>> = (props) => {
  return <UnsafeArea {...props} position='top' />;
};
