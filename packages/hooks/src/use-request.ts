import { RESPONSE_CODE } from '@heathen/constants';
import { IResponseData } from '@heathen/types';
import { mergeProps } from '@heathen/utils';
import Taro from '@tarojs/taro';
import { useRequest as _useRequest } from 'ahooks';
import { Options as _Options, Plugin, Result, Service } from 'ahooks/lib/useRequest/src/types';

type Handler<T = any> = (res: Taro.request.SuccessCallbackResult<IResponseData<T>>) => void;
type ResponseCodeType = string | number;

const defaultErrorHandler: Handler = (res) => {
  Taro.showToast({
    title: res.data.message || '系统异常',
  });
};

// ---------------------------------------------------------------------------------------------------------------

type Options<T, P extends any[], D = T> = _Options<D, P> & {
  /** 请求成功时请求结果的data如何转换为输出的data */
  parser?: (origin: T) => D;
  /** 描述各个异常状态如何处理 */
  handler?: Partial<Record<ResponseCodeType, Handler<T>>>;
};

const defaultOptions: Required<Pick<Options<any, any[]>, 'parser'>> = {
  parser: (origin) => origin,
};

/**
 * 二次封装的useRequest
 * - 可通过 parser 对成功响应的数据进行转换处理
 * - 可通过 handler 对指定错误码配置处理逻辑；无配置的错误码将交由默认处理
 */
export const useRequest = <T, P extends any[], D = T>(
  _service: Service<Taro.request.SuccessCallbackResult<IResponseData<T>>, P>,
  o?: Options<T, P, D>,
  plugins?: Array<Plugin<D, P>>,
): Result<D, P> => {
  const options = mergeProps(defaultOptions, o);

  const service: Service<D, P> = async (...args) => {
    const servicePromise = _service(...args).then(
      async (res) => {
        if (res.data.code === RESPONSE_CODE.SUCCESS) {
          return options.parser(res.data.data);
        } else {
          const handler = options?.handler?.[res.data.code] ?? defaultErrorHandler;
          handler(res);
          return await Promise.reject(new Error(res.data.message));
        }
      },
      (e) => {
        if (typeof e === 'string') {
          Taro.showToast({
            title: e,
          });
        } else if (typeof e === 'object' && (typeof e?.message === 'string' || typeof e?.data?.message === 'string')) {
          Taro.showToast({
            title: e.message || e.data.message || '系统异常',
          });
        } else {
          Taro.showToast({
            title: '系统异常',
          });
        }
        throw e;
      },
    );
    return await servicePromise;
  };

  return _useRequest(service, options, plugins);
};

export { clearCache } from 'ahooks';
export type { Plugin, Result, Service } from 'ahooks/lib/useRequest/src/types';
export type { Options };
