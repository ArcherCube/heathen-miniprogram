import { THEME_TYPE, THEME_TYPE_CONFIG, ThemeProvider } from '@/theme';
import { ConfigProvider, ConfigProviderProps } from '@heathen/components';
import Router from '@heathen/router';
import { useCreation } from 'ahooks';
import React, { useState } from 'react';
import { OSS_URL } from './constants/oss';

export const RootProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [currentTheme, setCurrentTheme] = useState<THEME_TYPE>(THEME_TYPE.DEFAULT);

  /** 生成主题css变量 */
  const themeVarStyle = useCreation<React.CSSProperties>(() => {
    const config = THEME_TYPE_CONFIG[currentTheme].theme;

    const colorStyle = Object.entries(config.colors).reduce<React.CSSProperties>(
      (allStyle, [colorName, colorConfig]) => {
        return {
          ...allStyle,
          ...Object.entries(colorConfig).reduce<React.CSSProperties>((oneColorStyle, [colorIndex, colorValue]) => {
            return {
              ...oneColorStyle,
              [`--${colorName}-${colorIndex}`]: colorValue,
            };
          }, {}),
        };
      },
      {},
    );

    return {
      ...colorStyle,
      '--tab-bar-height': config.size.tabBarHeight,
    };
  }, [currentTheme]);

  /** 组件配置 */
  const componentConfig = useCreation<ConfigProviderProps['config']>(() => {
    return {
      Image: {
        imageSrcPrefix: OSS_URL,
      },
      NavigationBar: {
        goBack: Router.back,
        homePage: '',
      },
      Page: {
        // 全局主题css变量通过page挂载
        style: themeVarStyle,
      },
    };
  }, [themeVarStyle]);

  return (
    <ThemeProvider value={{ currentTheme, setCurrentTheme }}>
      <ConfigProvider config={componentConfig}>{props.children}</ConfigProvider>
    </ThemeProvider>
  );
};
