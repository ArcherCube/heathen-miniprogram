import { PropsValueOptions, usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { ITouchEvent, ScrollView, View } from '@tarojs/components';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { clsx } from 'clsx';
import isNil from 'lodash-es/isNil';
import React, { useId } from 'react';

export type TabsItem = {
  key: string | number;
  title?: React.ReactNode;
  visible?: boolean;
};

export type TabsProps = {
  items: TabsItem[];
} & Partial<PropsValueOptions<any>> &
  NativeProps;

const defaultProps: Required<Pick<TabsProps, 'defaultValue'>> = {
  defaultValue: null,
};

export const Tabs: React.FC<TabsProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const idPrefix = `tabs-${useId()}`;
  const [value, setValue] = usePropsValue({
    ...props,
    defaultValue: props.defaultValue ?? props.items[0]?.key,
  });

  const getItemId = useMemoizedFn((suffix: string | number) => {
    return `${idPrefix}-${suffix}`;
  });

  const handleClick = useMemoizedFn((event: ITouchEvent) => {
    const { key } = event.target.dataset;

    setValue(key);
  });

  return withNativeProps(
    props,
    <View className='heathen-tabs'>
      <ScrollView className='heathen-tabs-scroll' scrollX>
        <View className='heathen-tabs-list'>
          {props.items
            .filter((item) => isNil(item.visible) || !!item.visible)
            .map((item) => {
              return (
                <View
                  className={clsx('heathen-tabs-list-item', { 'heathen-tabs-list-item-active': item.key === value })}
                  key={item.key}
                  data-key={item.key}
                  id={getItemId(item.key)}
                  onClick={handleClick}
                >
                  {item.title}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>,
  );
};
