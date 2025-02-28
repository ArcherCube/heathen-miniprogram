import { View, ViewProps } from '@tarojs/components';
import '../style';

export type IconProps = {
  type: string;
} & Omit<ViewProps, 'children'>;

export const Icon = (props: IconProps) => {
  const { type, className, ...otherProps } = props;

  return (
    <View
      className={`heathen-icon ${type} ${className}`}
      // @ts-ignore next-line
      alt='icon'
      {...otherProps}
    />
  );
};
