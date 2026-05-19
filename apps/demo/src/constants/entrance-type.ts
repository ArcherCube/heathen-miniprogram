import Router, { NavigateOptions } from '@heathenjs/taro-router';

export enum ENTRANCE_TYPE {
  ORDER_LIST = 'orderList',
}

export const ENTRANCE_TYPE_CONFIG: Record<
  ENTRANCE_TYPE,
  { label: string; value: ENTRANCE_TYPE; relaunchTo: (option: NavigateOptions) => Promise<any> }
> = {
  [ENTRANCE_TYPE.ORDER_LIST]: {
    label: '订单列表',
    value: ENTRANCE_TYPE.ORDER_LIST,
    relaunchTo: (options) => {
      return Router.toLogin(options);
    },
  },
};
