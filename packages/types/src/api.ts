export type IResponseData<T = any> = {
  /** 数据主体 */
  data: T;
  /** 响应码 */
  code: string;
  /** 提示信息 */
  message: string;
};
