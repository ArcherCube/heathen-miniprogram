import { ConfigEnv } from '@tarojs/cli';
import { chalk } from '@tarojs/helper';

type EnvLogConfig = {
  method: string;
};

const NODE_ENV_LOG_CONFIG: Record<typeof process.env.NODE_ENV, EnvLogConfig> = {
  development: {
    method: chalk.cyanBright('running'),
  },
  production: {
    method: chalk.greenBright('building'),
  },
};

export const environmentCheck = (env: ConfigEnv) => {
  const baseUrl = process.env.TARO_APP_API_BASE_URL;
  const ossUrl = process.env.TARO_APP_OSS_URL;

  if (!baseUrl || !ossUrl) {
    throw new Error(`找不到 "${env.mode}" 对应的 .env 配置文件，请检查命令及环境配置！`);
  }

  const config = NODE_ENV_LOG_CONFIG[process.env.NODE_ENV];

  console.log(`${config.method} miniprogram for ${chalk.black(chalk.bgYellowBright(` ${env.mode} `))}`);
  console.table({
    API_BASE_URL: process.env.TARO_APP_API_BASE_URL,
    OSS_URL: process.env.TARO_APP_OSS_URL,
  });
  console.log();
};
