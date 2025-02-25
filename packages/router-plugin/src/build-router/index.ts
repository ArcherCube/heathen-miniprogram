import { LOG_TYPE, Logger } from '../logger';
import { generateRouterSourceFile } from './generate-router-source-file';
import { loadPages } from './load-pages';
import { Config } from './type';
import { updateRouter } from './update-router';

export const buildRouter = (config: Config) => {
  Logger.log(LOG_TYPE.MESSAGE, `开始生成路由...`);
  // 按规则生成pages对象数组；
  const pages = loadPages({ config });
  // 按规则生成路由文件；
  const newSourceFile = generateRouterSourceFile({ config, pages });
  // 将源router文件与新生成的router文件合并，更新到源router
  updateRouter({ config, newSourceFile });

  // 清理
  newSourceFile.delete();

  Logger.log(LOG_TYPE.MESSAGE, `已生成 ${pages.length} 个页面的路由`);
};
