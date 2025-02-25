export interface ConfigPackage {
  /** 包名 */
  name: string;
  /** 包页面根路径 */
  pagePath: string;
}

export type Config = {
  /** 排除的文件 */
  ignore: string[];
  /**
   * 应用的默认页面，不指定时使用 pages 的第一项
   * - 注意 pages 是自动生成的，默认按字典序
   */
  defaultPage?: string;
  /** 包配置 */
  packages: ConfigPackage[];
};

export type Page = {
  dirName: string;
  dirPath: string;
  path: string;
  pageFileName: string;
  packageName: string;
  routeConfig?: {
    params?: string;
    backData?: string;
    ext?: string;
  };
};
