import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mergeProps, NativeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { useState } from 'react';
import { TabBar, TabBarItem } from '../tab-bar';
import { TabBarPageItem } from './page-item';

type TabBarPageConfigItem = TabBarItem & {
  component?: React.ReactNode;
  /** 定义后，将会打开新页面而不是切换tabKey */
  navigateTo?: () => any;
};

export type TabBarPageProps = {
  config: TabBarPageConfigItem[];
  defaultKey?: string;
  onReload?: (key: string) => void;
} & NativeProps;

const defaultProps: Required<Pick<TabBarPageProps, 'defaultKey'>> = {
  defaultKey: '',
};

export const TabBarPage: React.FC<TabBarPageProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [currentKey, setCurrentKey] = useState<string>(props.defaultKey ?? props.config[0]?.key);
  const screenWidth = useCreation(() => Taro.getWindowInfo().screenWidth, []);

  const renderableConfig = useCreation(() => {
    return props.config.filter((item) => !item.navigateTo);
  }, [props.config]);

  const currentIndex = useCreation(() => {
    const result = renderableConfig.findIndex((item) => item.key === currentKey);

    return result >= 0 ? result : 0;
  }, [renderableConfig, currentKey]);

  const handleChangeTab = useMemoizedFn((key: string) => {
    const page = props.config.find((config) => config.key === key);
    if (page?.navigateTo) {
      page.navigateTo?.();
    } else {
      setCurrentKey(key);
    }
  });

  return (
    <>
      <View className='heathen-tab-bar-page'>
        <View
          className='heathen-tab-bar-page-list'
          style={{ transform: `translate(-${screenWidth * currentIndex}px,0)` }}
        >
          {renderableConfig.map((item) => {
            return (
              <TabBarPageItem
                key={item.key}
                isCurrent={item.key === currentKey}
                onReload={() => props.onReload?.(item.key)}
              >
                {item.component}
              </TabBarPageItem>
            );
          })}
        </View>
      </View>
      <TabBar items={props.config} value={currentKey} onChange={handleChangeTab} />
    </>
  );
};
