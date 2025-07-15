import { generate } from '@heathen/colors';
import Taro from '@tarojs/taro';
import { Theme } from '../type';

const parseColorConfig = (colors: string[]): Record<number, string> => {
  return colors.reduce<Record<number, string>>((store, current, index) => {
    return {
      ...store,
      [index + 1]: current,
    };
  }, {});
};

export const theme: Theme = {
  colors: {
    primary: {
      ...parseColorConfig(generate('#1890ff')),
      primary: '#1890ff',
    },
    black: {
      1: 'rgba(4, 8, 20,0.04)',
      2: 'rgba(4, 8, 20,0.24)',
      3: 'rgba(4, 8, 20,0.4)',
      4: 'rgba(4, 8, 20,0.6)',
      5: 'rgba(4, 8, 20,0.9)',
      6: 'rgba(4, 8, 20,1)',
      primary: 'rgba(4, 8, 20,0.9)',
    },
    neutral: {
      1: '#ffffff',
      2: '#fafafa',
      3: '#f5f5f5',
      4: '#f0f0f0',
      5: '#d9d9d9',
      6: '#bfbfbf',
      7: '#8c8c8c',
      8: '#595959',
      9: '#434343',
      10: '#262626',
      11: '#1f1f1f',
      12: '#141414',
      13: '#000000',
      primary: '#262626',
    },
    success: {
      ...parseColorConfig(generate('#52c41a')),
      primary: '#52c41a',
    },
    warning: {
      ...parseColorConfig(generate('#faad14')),
      primary: '#faad14',
    },
    error: {
      ...parseColorConfig(generate('#ff4d4f')),
      primary: '#ff4d4f',
    },
  },
  size: {
    tabBarHeight: Taro.pxTransform(100),
  },
};
