import Taro from '@tarojs/taro';
import { mergeProps } from '../merge-props';

export type RequestConfig = Omit<Taro.request.Option, 'url' | 'data'> & {
  /** 接口基础路径 */
  baseUrl?: string;
};

const defaultConfig: Required<Pick<RequestConfig, 'baseUrl'>> = {
  baseUrl: '',
};

export const createRequest = (_config: (() => RequestConfig) | RequestConfig) => {
  const request = <T extends TaroGeneral.IAnyObject>(
    option: Taro.request.Option,
  ): Promise<Taro.request.SuccessCallbackResult<T>> => {
    const c = typeof _config === 'function' ? _config() : _config;
    const config = mergeProps(defaultConfig, c);
    const { baseUrl, ...defaultOption } = config;
    return Taro.request({
      ...defaultOption,
      ...option,
      url: `${baseUrl}${option.url}`,
      header: {
        ...defaultOption.header,
        ...option.header,
      },
    });
  };

  return request;
};
