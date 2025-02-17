export interface IConfigPackage {
  /** 包名 */
  name: string;
  /** 包页面根路径 */
  pagePath: string;
}
export interface IConfig {
  /** 排除的文件 */
  ignore: string[];
  /**
   * 应用的默认页面，不指定时使用 pages 的第一项
   * - 注意 pages 是自动生成的，默认按字典序
   */
  defaultPage?: string;
  /** 包配置 */
  packages: IConfigPackage[];
}

export const isDev = process.env.NODE_ENV === 'development';
