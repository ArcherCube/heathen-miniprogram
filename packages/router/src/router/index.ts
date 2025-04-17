import Taro, { Current, getCurrentInstance } from '@tarojs/taro';
import { mergeProps } from '@heathen/utils';
import { useCreation } from 'ahooks';
import { ROUTE_KEY } from '../constants';
import { NoPageException } from '../exception/no-page';
import { getCurrentRouteKey, isNil } from '../func';
import { execMiddlewares, getMiddlewares, RouteContext } from '../middleware';
import { PageData } from '../page-data';
import { execRouterBackListener } from '../router-back-listener';
import { NavigateOptions, NavigateType, Page, Route } from './type';

export { NavigateType } from './type';
export type { NavigateOptions, Route } from './type';

export class Router {
  /**
   * 页面跳转
   * @param route 目标路由对象
   * @param options 跳转选项
   */
  static async navigate<T = any>(route: Route, options?: NavigateOptions): Promise<T> {
    options = { ...{ type: NavigateType.navigateTo, params: {} }, ...options };
    options.params = Object.assign({}, options.params);
    const route_key = Date.now() + '';

    // TODO: taro官方缺少类型定义，as any过渡一下
    (Current as any)['_page'] = Current.page;
    Object.defineProperties(Current, {
      page: {
        set: function (page) {
          if (page === undefined || page === null) {
            this._page = page;
            return;
          }
          if (!page[ROUTE_KEY]) {
            const originOnUnload = page.onUnload;
            page.onUnload = function () {
              originOnUnload && originOnUnload.apply(this);
              PageData.emitBack(route_key);
              setTimeout(() => execRouterBackListener(route));
            };
            page[ROUTE_KEY] = route_key;
          }
          this._page = page;
        },
        get: function () {
          return this._page;
        },
      },
    });

    if (options.params) {
      PageData.setPageData(route_key, options.params);
    }

    const pages = (Router?.['_pages'] ?? []) as Page[];

    const context: RouteContext = {
      route,
      type: options.type!,
      params: options.params,
      packageName: pages.find((page) => page.path === route.url)?.packageName,
    };

    const middlewares = getMiddlewares(context);
    middlewares.push(async (_, next) => {
      switch (options!.type) {
        case NavigateType.reLaunch:
          await Taro.reLaunch({
            url: route.url,
            complete: options?.complete,
            fail: options?.fail,
            success: options?.success,
          });
          break;
        case NavigateType.redirectTo:
          await Taro.redirectTo({
            url: route.url,
            complete: options?.complete,
            fail: options?.fail,
            success: options?.success,
          });
          break;
        case NavigateType.switchTab:
          await Taro.switchTab({
            url: route.url,
            complete: options?.complete,
            fail: options?.fail,
            success: options?.success,
          });
          break;
        default:
          await Taro.navigateTo({
            url: route.url,
            complete: options?.complete,
            fail: options?.fail,
            success: options?.success,
          });
          break;
      }
      next();
    });

    return new Promise(async (res, rej) => {
      try {
        PageData.setPagePromise(route_key, { res, rej });
        await execMiddlewares(middlewares, context);
      } catch (err) {
        rej(err);
      }
    });
  }

  /**
   * 返回上一个页面
   * @param result 返回给上一个页面的数据，如果 result 是 Error 的实例，则是抛出异常给上一个页面
   * @param options 其他选项
   */
  static back(
    result?: unknown,
    options?: {
      /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
      delta?: number;
    },
  ) {
    if (!isNil(result)) {
      PageData.setBackResult(result);
    }

    const currentPages = Taro.getCurrentPages();
    if (currentPages.length > 1) {
      return Taro.navigateBack(options);
    }

    throw new NoPageException();
  }

  /**
   * 设置页面返回的数据
   * 当物理键返回和左上角返回也需要带数据时会使用到
   */
  static setBackResult(result: any) {
    PageData.setBackResult(result);
  }

  /**
   * 获取页面携带过来的数据，混合顺序为 路由参数 > URL参数 > 默认参数
   * @param default_value 默认参数
   */
  static getParams<T extends Record<string, any> = {}>(default_value?: T): T {
    const urlParams = Object.assign({}, getCurrentInstance().router?.params) as T;
    const routerParams = PageData.getPageData<T>();
    return mergeProps({}, default_value, urlParams, routerParams);
  }

  /**
   * 获取页面携带过来的数据，混合顺序为 路由参数 > URL参数 > 默认参数
   * @param default_value 默认参数
   */
  static useParams<T extends Record<string, any> = {}>(default_value?: T): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCreation(() => Router.getParams(default_value), []);
  }

  static setParams<T extends Record<string, any> = {}>(value: T) {
    const route_key = getCurrentRouteKey();
    PageData.setPageData(route_key, value);
  }
}
