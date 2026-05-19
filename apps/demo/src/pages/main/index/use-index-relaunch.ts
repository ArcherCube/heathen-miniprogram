import Router, { NavigateOptions, NavigateType } from '@heathenjs/taro-router';
import Taro from '@tarojs/taro';
import { useCreation, useRequest } from 'ahooks';
import { ENTRANCE_TYPE_CONFIG } from '@/constants/entrance-type';
import { Params } from './route.config';

export const useIndexRelaunch = () => {
  const params = Router.useParams<Params>();
  const launchOptions = useCreation(() => Taro.getLaunchOptionsSync(), []);

  const { runAsync: relaunch } = useRequest(
    (options?: NavigateOptions) => {
      let relaunchTo: (options: NavigateOptions) => Promise<any> = Router.toLogin;
      const scene = `${launchOptions.scene}`;

      const type = params.type;
      const typeConfig = type ? ENTRANCE_TYPE_CONFIG[type] : undefined;
      console.log(`url params: ${params}`);
      console.log(`scene: ${scene}`);

      if (typeConfig) {
        if (typeConfig?.relaunchTo) {
          relaunchTo = typeConfig.relaunchTo;
        }
      }

      return relaunchTo({ type: NavigateType.reLaunch, ...options });
    },
    {
      // 避免有时候重定向失败，增加重试
      retryCount: 3,
      retryInterval: 0,
      manual: true,
      onBefore: () => {
        Taro.showLoading();
      },
      onFinally: () => {
        Taro.hideLoading();
      },
    },
  );

  return { relaunch };
};
