type OssProcessConfig = {
  /** 参数名 */
  paramKey: string;
};

export const OSS_PROCESS_CONFIG: Record<typeof process.env.TARO_APP_OSS_TYPE, OssProcessConfig> = {
  ALIYUNOSS: {
    paramKey: 'x-oss-process',
  },
  HUAWEIOBS: {
    paramKey: 'x-image-process',
  },
};
