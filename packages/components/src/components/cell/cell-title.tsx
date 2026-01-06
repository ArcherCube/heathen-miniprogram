import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CellTitleProps extends ViewProps {
  children?: ReactNode;
}

function CellTitle(props: CellTitleProps) {
  const { className, ...restProps } = props;
  return <View className={clsx('heathen-cell__title', className)} {...restProps} />;
}

export default CellTitle;
