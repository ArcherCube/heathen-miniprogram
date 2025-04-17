import fs from 'fs';
import ignore from 'ignore';
import normalize from 'normalize-path';
import path from 'path';
import { tsProject } from '../common';
import { MAIN_PACKAGE_NAME, SOURCE_PATH } from '../constant';
import { LOG_TYPE, Logger } from '../logger';
import { Config, Page } from '../type';
import { extractValue, formatPageDir } from '../utils';

const ACCEPTS_INDEX_FILE = ['index.js', 'index.jsx', 'index.jsx', 'index.tsx'];

type LoadPagesParams = {
  config: Config;
};

export const loadPages = ({ config }: LoadPagesParams): Page[] => {
  const ignoreFilter = ignore().add(config.ignore).createFilter();
  const pages: Page[] = [];

  for (const pkg of config.packages) {
    const routeConfigSourceFiles = tsProject.addSourceFilesAtPaths(path.join(pkg.pagePath, '/**/route.config.ts'));
    const pageDirNames = fs
      .readdirSync(pkg.pagePath, { recursive: true, encoding: 'utf-8' })
      /** 仅保留包含index的目录 */
      .filter((pageDirName) => {
        return (
          fs.statSync(path.resolve(pkg.pagePath, pageDirName)).isDirectory() &&
          ACCEPTS_INDEX_FILE.some((filename) => fs.existsSync(path.resolve(pkg.pagePath, pageDirName, filename)))
        );
      })
      // ignore配置
      .filter(ignoreFilter);

    for (const pageDirName of pageDirNames) {
      const indexFileName = fs
        .readdirSync(path.resolve(pkg.pagePath, pageDirName), { encoding: 'utf8' })
        .filter((filename) => ACCEPTS_INDEX_FILE.some((_filename) => filename === _filename))[0];

      const configPath = path.resolve(pkg.pagePath, pageDirName, 'route.config.ts');
      const configSourceFile = routeConfigSourceFiles.find((_sourceFile) => {
        return path.normalize(_sourceFile.compilerNode.fileName) === configPath;
      });
      configSourceFile?.refreshFromFileSystemSync();

      const dirPath = path.resolve(pkg.pagePath, pageDirName);
      const dirName = normalize(pageDirName);

      pages.push({
        packageName: pkg.name,
        dirName,
        dirPath,
        // 生成跳转路径
        path: normalize(path.join(pkg.pagePath.replace(SOURCE_PATH, ''), pageDirName, 'index')),
        pageFileName: indexFileName,
        routeConfig: configSourceFile
          ? Array.from(configSourceFile.getExportedDeclarations().entries()).reduce(
              (_routeConfig, [name, declarations]) => {
                if (declarations.length > 1) return _routeConfig;

                const declaration = declarations[0] as any;
                switch (name) {
                  case 'Params':
                    _routeConfig.params = `import('${path.resolve(dirPath, 'route.config').replace(/\\/g, '/')}').Params`;
                    break;
                  case 'BackData':
                    _routeConfig.backData = `import('${path.resolve(dirPath, 'route.config').replace(/\\/g, '/')}').BackData`;
                    break;
                  case 'Ext':
                    _routeConfig.ext = extractValue({
                      name,
                      declaration,
                    });
                    break;
                }
                return _routeConfig;
              },
              {} as NonNullable<Page['routeConfig']>,
            )
          : undefined,
      });

      Logger.log(
        LOG_TYPE.GENERATE,
        `Router.${pkg.name === MAIN_PACKAGE_NAME ? '' : `${pkg.name}.`}to${formatPageDir(dirName)}`,
      );
    }
  }

  return pages;
};
