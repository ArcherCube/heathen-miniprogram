import Router, { Middleware, NavigateType } from '@heathenjs/taro-router';
import { useUser } from '@/store/user';
import { type RouteExt, DEFAULT_ROUTE_EXT } from '@/types/route-ext';

export const LoginStatusMiddleware: Middleware<RouteExt> = (ctx, next) => {
  const { userInfo } = useUser.getState();

  const isLogin = !!userInfo;
  const ext = { ...DEFAULT_ROUTE_EXT, ...(ctx.route.ext || {}) };

  if (!ext.noLogin && !isLogin) {
    return Router.toIndex({ type: NavigateType.reLaunch }).finally(() => {
      throw new Error('未登录访问系统');
    });
  }

  return next();
};
