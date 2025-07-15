import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import clsx from 'clsx';
import { ReactNode } from 'react';
import CellGroupContext from './cell-group.context';

interface CellGroupProps extends ViewProps {
  title?: ReactNode;
  clickable?: boolean;
  inset?: boolean;
  bordered?: boolean;
  children?: ReactNode;
}

export function CellGroup(props: CellGroupProps) {
  const { title, clickable = false, inset = false, bordered = true, children, className, ...restProps } = props;
  return (
    <CellGroupContext.Provider
      value={{
        clickable,
      }}
    >
      <View
        className={clsx(
          'heathen-cell-group',
          {
            ['heathen-cell-group--inset']: inset,
          },
          className,
        )}
        {...restProps}
      >
        {title && (
          <View
            className={clsx('heathen-cell-group__title', {
              ['heathen-cell-group__title--inset']: inset,
            })}
          >
            {title}
          </View>
        )}
        <View
          className={clsx('heathen-cell-group', {
            ['heathen-hairline--top-bottom']: bordered,
          })}
        >
          {children}
        </View>
      </View>
    </CellGroupContext.Provider>
  );
}

export default CellGroup;
