import { chalk } from '@tarojs/helper';

export enum LOG_TYPE {
  /** 信息 */
  MESSAGE,
  /** 生成 */
  GENERATE,
}

export const LOG_TYPE_CONFIG = {
  [LOG_TYPE.MESSAGE]: {
    label: '提示',
    value: LOG_TYPE.MESSAGE,
    wrapperColor: chalk.green,
  },

  [LOG_TYPE.GENERATE]: {
    label: '生成',
    value: LOG_TYPE.GENERATE,
    wrapperColor: chalk.blue,
  },
};

export class Logger {
  static log = (type: LOG_TYPE, message: any) => {
    const logConfig = LOG_TYPE_CONFIG[type];
    console.log(`${logConfig.wrapperColor(logConfig.label)} ${message}`);
  };
}
