import Taro from '@tarojs/taro';
import { ROUTE_KEY } from '../constants';

export function getCurrentRouteKey(): string {
  if (!Taro.Current.page) {
    return '';
  }
  // TODO: taro官方缺少类型定义，as any过渡一下
  return (Taro.Current.page as any)[ROUTE_KEY];
}
