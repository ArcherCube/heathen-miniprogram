import { View } from '@tarojs/components';
import { TaroElement } from '@tarojs/runtime';
import { useMount, useUnmount } from 'ahooks';
import React, { useRef } from 'react';
import { useConfig } from '../config-provider';
import { AdditionalElement } from './additional-element';
import { PageContext } from './context';
import { PAGE_EVENT_TYPE, pageEvent } from './event';

/**
 * hoc，用于包裹页面组件。会在页面最外层增加一个空白的view，让诸如弹窗、实时更改全局css变量等基于根节点的操作能便捷实现
 */
export const withPage = <T extends any>(page: React.FC<T>): React.FC<T> => {
  return (props: T) => {
    const ref = useRef<TaroElement>(null);
    const { Page: pageProps } = useConfig();

    useMount(() => {
      pageEvent.emit(PAGE_EVENT_TYPE.MOUNT, { pageRef: ref });
    });

    useUnmount(() => {
      pageEvent.emit(PAGE_EVENT_TYPE.UNMOUNT);
    });

    return (
      <PageContext.Provider value={{ rootElementRef: ref }}>
        <View {...pageProps} ref={ref}>
          {page(props)}
          <AdditionalElement />
        </View>
      </PageContext.Provider>
    );
  };
};
