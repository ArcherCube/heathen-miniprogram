import { ScrollView, View } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import React, { useEffect, useState } from 'react';

export type TabBarPageItemProps = {
  isCurrent?: boolean;
  children: React.ReactNode;
  onReload?: () => void;
};

export const TabBarPageItem: React.FC<TabBarPageItemProps> = (props) => {
  const [renderKey, setRenderKey] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleReload = useMemoizedFn(() => {
    setLoading(true);
    setRenderKey(Date.now());
    setTimeout(() => {
      setLoading(false);
      props.onReload?.();
    });
  });

  useEffect(() => {
    if (props.isCurrent && !renderKey) {
      setRenderKey(Date.now());
    }
  }, [props.isCurrent, renderKey]);

  return (
    <ScrollView
      className='heathen-tab-bar-page-item'
      refresherEnabled
      onRefresherRefresh={handleReload}
      refresherTriggered={loading}
      scrollY
    >
      <View className='heathen-tab-bar-page-item' key={renderKey}>
        {renderKey ? props.children : null}
      </View>
    </ScrollView>
  );
};
