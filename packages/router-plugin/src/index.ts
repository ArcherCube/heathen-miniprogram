import { IPluginContext } from '@tarojs/service';
import { buildRouter } from './build-router';
import { MAIN_PACKAGE_NAME } from './constant';
import { Config } from './type';
import { loadPages } from './load-pages';
import { generateAppConfig } from './generate-app-config';
import { LOG_TYPE, Logger } from './logger';

export default (ctx: IPluginContext, config: Config) => {
  config.packages = config.packages ?? [];
  if (config.packages.findIndex((pkg) => pkg.name === MAIN_PACKAGE_NAME) === -1) {
    throw new Error('找不到主包配置，请检查插件配置中是否包含 name 为 main 的 package。');
  }
  config.ignore = config.ignore ?? ['.DS_Store'];

  ctx.onBuildStart(() => {
    Logger.log(LOG_TYPE.MESSAGE, `开始生成路由...`);

    const pages = loadPages({ config });
    buildRouter({ config, pages });
    ctx.modifyAppConfig(({ appConfig }) => {
      Object.assign(appConfig, generateAppConfig({ config, pages }));
    });

    Logger.log(LOG_TYPE.MESSAGE, `已生成 ${pages.length} 个页面的路由`);
    console.log();
  });
};
