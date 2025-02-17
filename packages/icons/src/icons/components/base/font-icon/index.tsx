import { View, ViewProps } from '@tarojs/components';
import clsx from 'clsx';
import '../style';

export type IconProps = {
  type: string;
} & Omit<ViewProps, 'children'>;

export const Icon = (props: IconProps) => {
  const { type, className, ...otherProps } = props;

  return (
    <View
      className={clsx('heathen-icon', `${type}`, className)}
      // @ts-ignore next-line
      alt='icon'
      {...otherProps}
    />
  );
};
