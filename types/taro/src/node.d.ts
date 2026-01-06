declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production';
    /** 当前构建的平台 */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    /** 静态资源（OSS）地址 */
    TARO_APP_OSS_URL: string;
    /** 接口根地址 */
    TARO_APP_API_BASE_URL: string;

    TZ?: number;
  }
}
