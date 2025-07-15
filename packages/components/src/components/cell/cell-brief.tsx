import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface CellBriefProps extends ViewProps {
  children: ReactNode;
}

function CellBrief(props: CellBriefProps) {
  const { className, ...restProps } = props;
  return <View className={clsx('heathen-cell__brief', className)} {...restProps} />;
}

export default CellBrief;
