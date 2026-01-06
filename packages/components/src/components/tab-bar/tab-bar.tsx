import { usePropsValue } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { View } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import { clsx } from 'clsx';

export type TabBarItem = {
  /** 选中时的图标 */
  selectedIcon?: React.ReactNode;
  /** 图标 */
  icon: React.ReactNode;
  /** 文案 */
  title: React.ReactNode;
  /** key值 */
  key: string;
  /** 是否凸起 */
  raise?: boolean;
};

export type TabBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  items: TabBarItem[];
} & NativeProps<'--tab-bar-height'>;

const defaultProps: Required<Pick<TabBarProps, 'defaultValue'>> = {
  defaultValue: '',
};

export const TabBar: React.FC<TabBarProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [value, setValue] = usePropsValue(props);

  const handleClick = useMemoizedFn((item: TabBarItem) => {
    setValue(item.key);
  });

  return withNativeProps(
    props,
    <View className='heathen-tab-bar'>
      <View className='heathen-tab-bar-tabs'>
        {props.items.map((item) => {
          const isCurrent = value === item.key;
          return (
            <View
              key={item.key}
              className={clsx('heathen-tab-bar-tabs-item', {
                'heathen-tab-bar-tabs-item-actived': isCurrent,
                'heathen-tab-bar-tabs-item-raise': item.raise,
              })}
              onClick={() => handleClick(item)}
            >
              <View className='heathen-tab-bar-tabs-item-icon'>
                <View className='heathen-tab-bar-tabs-item-icon-active'>{item.selectedIcon}</View>
                <View className='heathen-tab-bar-tabs-item-icon-normal'>{item.icon}</View>
              </View>
              <View className='heathen-tab-bar-tabs-item-text'>{item.title}</View>
            </View>
          );
        })}
      </View>
      <View className='heathen-tab-bar-safe-area' />
    </View>,
  );
};
