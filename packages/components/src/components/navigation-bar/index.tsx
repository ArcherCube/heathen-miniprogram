import { useLayout } from '@heathen/hooks';
import Icon, { HomeTwo, Left } from '@heathen/icons';
import { NativeProps, withNativeProps } from '@heathen/utils';
import { Button } from '@taroify/core';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import './index.css';

export type NavigationBarProps = {
  /** 强制展示返回按钮 */
  forceShowBackButton?: boolean;
  /** 强制展示主页按钮 */
  forceShowHomeButton?: boolean;
  /** 强制展示按钮框架 */
  forceShowButtonsFrame?: boolean;
} & NativeProps;

export const NavigationBar: React.FC<React.PropsWithChildren<NavigationBarProps>> = (props) => {
  const layout = useLayout();
  const pages = Taro.getCurrentPages();

  const outterStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};

    if (layout) {
      style.paddingTop = `${layout.navigationBarPaddingY + layout.statusBarHeight}px`;
      style.paddingBottom = `${layout.navigationBarPaddingY}px`;
      style.height = `${layout.navigationBarHeight}px`;
    }

    if (layout?.menuRect?.right && layout.screenWidth) {
      style.paddingInline = `${layout.screenWidth - layout.menuRect.right}px`;
    }

    return style;
  }, [layout]);

  const buttonsStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};

    if (layout?.menuRect.height) {
      style.height = `${layout.menuRect.height}px`;
    }

    if (layout?.menuRect?.right && layout.screenWidth) {
      style.left = `${layout.screenWidth - layout.menuRect.right}px`;
    }

    return style;
  }, [layout]);

  const [showBackButton, showHomeButton] = useMemo(() => {
    let _showBackButton = props.forceShowBackButton || pages.length > 1;
    let _showHomeButton = props.forceShowHomeButton || pages.length > 2;

    return [_showBackButton, _showHomeButton];
  }, [props.forceShowBackButton, props.forceShowHomeButton, pages.length]);

  const handleGoBack = useMemoizedFn(() => {
    Taro.navigateBack();
  });

  const showButtonsFrame = showHomeButton && showBackButton;
  const showButtons = showHomeButton || showBackButton;
  return withNativeProps(
    props,
    <View className='heathen-navigation-bar' style={outterStyle}>
      {showButtons ? (
        <View
          className={`heathen-navigation-bar-buttons ${showButtonsFrame ? 'heathen-navigation-bar-buttons-group' : ''}`}
          style={buttonsStyle}
        >
          {showBackButton ? (
            <Button className='heathen-navigation-bar-buttons-button' variant='text' onClick={handleGoBack}>
              <Icon type={Left} style={{ fontSize: '36rpx' }} />
            </Button>
          ) : null}
          {showButtonsFrame ? <View className='heathen-navigation-bar-buttons-split' /> : null}
          {showHomeButton ? (
            <Button className='heathen-navigation-bar-buttons-button' variant='text'>
              <Icon type={HomeTwo} />
            </Button>
          ) : null}
        </View>
      ) : null}
      {props.children}
    </View>,
  );
};
