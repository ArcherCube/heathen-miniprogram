import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CellValueProps extends ViewProps {
  alone?: boolean;
  children: ReactNode;
}

function CellValue(props: CellValueProps) {
  const { className, alone, ...restProps } = props;
  return (
    <View
      className={clsx(
        'heathen-cell__value',
        {
          ['heathen-cell__value--alone']: alone,
        },
        className,
      )}
      {...restProps}
    />
  );
}

export default CellValue;
