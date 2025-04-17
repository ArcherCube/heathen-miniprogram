import { Config, Page } from '../type';
import { generateRouterSourceFile } from './generate-router-source-file';
import { updateRouter } from './update-router';

type BuildRouterParams = {
  config: Config;
  pages: Page[];
};

export const buildRouter = ({ config, pages }: BuildRouterParams) => {
  // 按规则生成路由文件；
  const newSourceFile = generateRouterSourceFile({ config, pages });
  // 将源router文件与新生成的router文件合并，更新到源router
  updateRouter({ config, newSourceFile });

  // 清理
  newSourceFile.delete();
};
