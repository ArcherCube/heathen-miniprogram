import path from 'path';
import { MAIN_PACKAGE_NAME, SOURCE_PATH } from '../constant';
import { Config, Page } from '../type';

type GenerateAppConfigParams = {
  pages: Page[];
  config: Config;
};

export const generateAppConfig = ({ pages, config }: GenerateAppConfigParams) => {
  const subPackages = config.packages
    .filter((pkg) => pkg.name !== MAIN_PACKAGE_NAME)
    .map((pkg) => {
      return {
        root: pkg.pagePath.replace(SOURCE_PATH, '').slice(1),
        pages: [] as string[],
      };
    });

  const appConfig: Required<Pick<Taro.AppConfig, 'pages' | 'subPackages'>> = { pages: [], subPackages };

  pages.forEach((currentPage) => {
    if (currentPage.packageName === MAIN_PACKAGE_NAME) {
      // 主包的页面去除头部的 /
      appConfig.pages.push(currentPage.path.slice(1));
    } else {
      // 对于分包，判断所属的分包并加入
      const targetSubPackage = appConfig.subPackages.find((pkg) =>
        currentPage.path.startsWith(`${path.sep}${pkg.root}`),
      );
      if (targetSubPackage) {
        targetSubPackage.pages.push(currentPage.path.replace(`${path.sep}${targetSubPackage.root}${path.sep}`, ''));
      }
    }
  });

  // 配置了默认页面时，调整主包页面顺序
  if (config.defaultPage) {
    appConfig.pages.sort((left) => {
      if (left === config.defaultPage) return -1;

      return 0;
    });
  }

  return appConfig;
};
