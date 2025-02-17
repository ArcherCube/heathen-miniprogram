import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useLayout } from '@heathen/hooks';
import { HomeOutlined, LeftOutlined } from '@heathen/icons';
import { NativeProps, withNativeProps } from '@heathen/utils';
import { useCreation, useMemoizedFn } from 'ahooks';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useConfig } from '../config-provider';
import { Button } from '../button';

export type NavigationBarProps = {
  /** 强制控制返回按钮的显隐 */
  showBackButton?: boolean;
  /** 强制控制主页按钮的显隐 */
  showHomeButton?: boolean;
} & NativeProps<'--button-background'>;

export const NavigationBar: React.FC<React.PropsWithChildren<NavigationBarProps>> = (props) => {
  const layout = useLayout();
  const pages = Taro.getCurrentPages();
  const {
    NavigationBar: { goBack, homePage },
  } = useConfig();
  const { path } = useRouter();

  // getCurrentPages 会随页面栈实时更新，但小程序是多页面架构，打开新页面会导致前面的页面获取到的页面栈变化
  // 所以要解析目前这个组件在页面栈中的位置，来获取“此时的页面深度”
  const currentPageDepth = useCreation(() => {
    return pages.findIndex((page) => `/${page.route}` === path) + 1;
  }, [path, pages]);

  const [showBackButton, showHomeButton] = useMemo(() => {
    let _showBackButton = props.showBackButton ?? currentPageDepth > 1;
    let _showHomeButton = props.showHomeButton ?? homePage !== path;

    return [_showBackButton, _showHomeButton];
  }, [props.showBackButton, props.showHomeButton, currentPageDepth, homePage, path]);

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

    if (layout?.menuRect?.right && layout.screenWidth) {
      style.left = `${layout.screenWidth - layout.menuRect.right}px`;
    }

    return style;
  }, [layout]);

  const handleGoBack = useMemoizedFn(() => {
    goBack();
  });

  const handleGoHome = useMemoizedFn(() => {
    Taro.reLaunch({ url: homePage });
  });

  const showButtonsFrame = showHomeButton && showBackButton;
  const showButtons = showHomeButton || showBackButton;
  return withNativeProps(
    props,
    <View
      className='heathen-navigation-bar'
      style={
        {
          ...outterStyle,
          '--button-background': showButtonsFrame ? 'rgb(255 255 255 / 60%)' : '',
        } as React.CSSProperties
      }
    >
      {showButtons ? (
        <View
          className={clsx('heathen-navigation-bar-buttons', {
            'heathen-navigation-bar-buttons-frame': showButtonsFrame,
          })}
          style={buttonsStyle}
        >
          {showBackButton ? (
            <Button className='heathen-navigation-bar-buttons-button' variant='text' onClick={handleGoBack}>
              <LeftOutlined />
            </Button>
          ) : null}
          {showButtonsFrame ? <View className='heathen-navigation-bar-buttons-split' /> : null}
          {showHomeButton ? (
            <Button className='heathen-navigation-bar-buttons-button' variant='text' onClick={handleGoHome}>
              <HomeOutlined />
            </Button>
          ) : null}
        </View>
      ) : null}
      {props.children}
    </View>,
  );
};
