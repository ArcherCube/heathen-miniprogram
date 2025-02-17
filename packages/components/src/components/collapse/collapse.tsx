import { View } from '@tarojs/components';
import { TaroElement } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import { usePropsValue } from '@heathen/hooks';
import { DownOutlined } from '@heathen/icons';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { useCreation, useMemoizedFn } from 'ahooks';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export type CollapseProps = {
  collapse?: boolean;
  defaultCollapse?: boolean;
  onCollapseChange?: (collapse: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
} & NativeProps;

const defaultProps: Required<Pick<CollapseProps, 'defaultCollapse'>> = {
  defaultCollapse: true,
};

export const Collapse: React.FC<CollapseProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [collapse, setCollapse] = usePropsValue({
    value: props.collapse,
    defaultValue: props.defaultCollapse,
    onChange: props.onCollapseChange,
  });
  const contentRef = useRef<TaroElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleCollapse = useMemoizedFn(() => {
    setCollapse((currentCollapse) => !currentCollapse);
  });

  const wrapperStyle = useCreation(() => {
    return {
      height: collapse ? '0px' : `${contentHeight}px`,
    };
  }, [collapse, contentHeight]);

  // 挂载后更新content高度
  useEffect(() => {
    // 这里等半秒主要考虑富文本的图片渲染需要时间，在此之前得到的高度不准
    setTimeout(() => {
      Taro.createSelectorQuery()
        .select(`#${contentRef.current?.uid}`)
        .boundingClientRect((rect) => {
          if (rect instanceof Array) {
            rect = rect[0];
          }
          setContentHeight(rect.height);
        })
        .exec();
    }, 500);
  }, [props.children]);

  return withNativeProps(
    props,
    <View className={clsx('heathen-collapse', { 'heathen-collapse-expand': !collapse })}>
      <View className='heathen-collapse-header' onClick={handleCollapse}>
        <View className='heathen-collapse-header-title'>{props.title}</View>
        <View className='heathen-collapse-header-icon'>
          <DownOutlined />
        </View>
      </View>
      <View className='heathen-collapse-divide' />
      <View className='heathen-collapse-content-wrapper' style={wrapperStyle}>
        <View className='heathen-collapse-content' ref={contentRef}>
          {props.children}
        </View>
      </View>
    </View>,
  );
};
