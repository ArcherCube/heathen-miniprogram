import { Block } from '@tarojs/components';
import useCreation from 'ahooks/es/useCreation';
import useUpdate from 'ahooks/es/useUpdate';
import React, { useEffect } from 'react';
import { AdditionalElementManager } from './manager';

/** 获取当前页面的额外元素 */
const useAdditionalElement = () => {
  const forceUpdate = useUpdate();

  const additionalElementManager = useCreation(() => {
    return new AdditionalElementManager();
  }, []);

  useEffect(() => {
    additionalElementManager.reigster(forceUpdate);

    return () => {
      additionalElementManager.unRegister();
    };
  }, [additionalElementManager, forceUpdate]);

  return {
    additionalElementMap: additionalElementManager.getElementMap(),
  };
};

export const AdditionalElement: React.FC = () => {
  const { additionalElementMap } = useAdditionalElement();

  return (
    // 使用block是为了避免当前组件更新时，诸如scroll-view等组件会因Taro机制引起重建，导致滚动位置重置的问题
    <Block>
      {Array.from(additionalElementMap ?? []).map(([key, element]) => {
        return React.cloneElement(element, { key });
      })}
    </Block>
  );
};
