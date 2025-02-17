import { processTypeEnum } from '@tarojs/helper/dist/constants';
import fs from 'fs';
import ignore from 'ignore';
import normalize from 'normalize-path';
import path from 'path';
import { Project, SourceFile } from 'ts-morph';
import { IConfigPackage } from './config';
import { MAIN_PACKAGE_NAME } from './constant';
import { ConfigPage, Page, PageMethod, RouteConfig } from './entitys';
import { Plugin } from './plugin';
import { extractValue, formatPageDir, isNil } from './utils';

export class Loader {
  project = new Project();
  configPages: ConfigPage[] = [];
  // appConfigPath: string;
  // appConfig: {
  //   pages: string[];
  //   subpackages?: any[];
  //   subPackages?: any[];
  //   window: any;
  // };

  constructor(private readonly root: Plugin) {
    // 非开发模式则读取 app.config.ts 中的配置，用于过滤未配置的页面
    // if (!this.root.isWatch) {
    //   if (this.appConfig) return;
    //   this.appConfigPath = this.root.helper.resolveMainFilePath(
    //     path.resolve(this.root.paths.sourcePath, './app.config'),
    //   );
    //   this.appConfig = this.root.helper.readConfig(this.appConfigPath);
    //   for (const page of this.appConfig.pages) {
    //     this.configPages.push(
    //       new ConfigPage({
    //         path: page,
    //         packageRoot: '',
    //         fullPath: path.resolve(this.root.paths.sourcePath, page),
    //       }),
    //     );
    //   }
    //   for (const pkg of this.appConfig.subpackages || this.appConfig.subPackages || []) {
    //     for (const page of pkg.pages) {
    //       this.configPages.push(
    //         new ConfigPage({
    //           path: page,
    //           packageRoot: pkg.root,
    //           fullPath: path.resolve(this.root.paths.sourcePath, pkg.root, page),
    //         }),
    //       );
    //     }
    //   }
    // }
  }

  loadPages() {
    this.root.pages = [];
    const ignoreFilter = ignore().add(this.root.config.ignore).createFilter();
    for (const pkg of this.root.config.packages) {
      const routeConfigSourceFiles = this.project.addSourceFilesAtPaths(pkg.pagePath + '/**/route.config.ts');

      fs.readdirSync(pkg.pagePath, { recursive: true, encoding: 'utf-8' })
        /** 仅保留包含index的目录 */
        .filter((pageDirName) => {
          return (
            fs.statSync(path.resolve(pkg.pagePath, pageDirName)).isDirectory() &&
            (fs.existsSync(path.resolve(pkg.pagePath, pageDirName, 'index.tsx')) ||
              fs.existsSync(path.resolve(pkg.pagePath, pageDirName, 'index.ts')) ||
              fs.existsSync(path.resolve(pkg.pagePath, pageDirName, 'index.jsx')) ||
              fs.existsSync(path.resolve(pkg.pagePath, pageDirName, 'index.js')))
          );
        })
        // ignore配置
        .filter(ignoreFilter)
        .forEach((pageDirName) => {
          const fullPath = path.resolve(pkg.pagePath, pageDirName, 'index');
          // if (
          //   !this.root.isWatch &&
          //   this.configPages.findIndex((configPage) => configPage.fullPath === fullPath) === -1
          // ) {
          //   return;
          // }

          const page = new Page({
            packageName: pkg.name,
            dirName: pageDirName,
            dirPath: path.resolve(pkg.pagePath, pageDirName),
            // 生成跳转路径
            path: normalize(path.join(pkg.pagePath.replace(this.root.paths.sourcePath, ''), pageDirName, 'index')),
            fullPath: fullPath,
          });

          const sourceFile = routeConfigSourceFiles.find((_sourceFile) => {
            return path.normalize(_sourceFile.compilerNode.fileName) === path.resolve(page.dirPath, 'route.config.ts');
          });

          if (sourceFile) {
            this.loadRouteConfig(page, sourceFile);
          }

          this.loadMethod(page);

          this.root.pages.push(page);
          this.root.log(
            processTypeEnum.GENERATE,
            `Router.${page.packageName === MAIN_PACKAGE_NAME ? '' : page.packageName + '.'}${page.method?.name}`,
          );
        });
    }
  }

  loadPage(pageDirPath: string, pkg: IConfigPackage) {
    const index = this.root.pages.findIndex((page) => page.dirPath === pageDirPath);

    const isExist = fs.existsSync(pageDirPath);
    if (isExist) {
      if (index !== -1) {
        const page = this.root.pages[index];
        this.loadRouteConfig(page);
        this.loadMethod(page);
        this.root.log(
          processTypeEnum.MODIFY,
          `Router.${page.packageName === MAIN_PACKAGE_NAME ? '' : page.packageName + '.'}${page.method?.name}`,
        );
      } else {
        const page = new Page({
          packageName: pkg.name,
          dirName: path.parse(pageDirPath).name,
          dirPath: pageDirPath,
          path: path.resolve(pageDirPath.replace(this.root.paths.sourcePath, ''), 'index'),
          fullPath: path.resolve(pageDirPath, 'index'),
        });
        this.loadRouteConfig(page);
        this.loadMethod(page);
        this.root.pages.push(page);
        this.root.log(
          processTypeEnum.GENERATE,
          `Router.${page.packageName === MAIN_PACKAGE_NAME ? '' : page.packageName + '.'}${page.method?.name}`,
        );
      }
      return true;
    } else {
      if (index !== -1) {
        const [page] = this.root.pages.splice(index, 1);
        this.root.log(
          processTypeEnum.UNLINK,
          `Router.${page.packageName === MAIN_PACKAGE_NAME ? '' : page.packageName + '.'}${page.method?.name}`,
        );
        return true;
      } else {
        return false;
      }
    }
  }

  loadRouteConfig(page: Page, configSourceFile?: SourceFile) {
    page.routeConfig = undefined;
    const routeConfig: RouteConfig = {};

    if (!configSourceFile) {
      const configPath = path.resolve(page.dirPath, 'route.config.ts');
      if (!fs.existsSync(configPath)) return;
      configSourceFile = this.project.getSourceFile(configPath);
      if (configSourceFile) {
        configSourceFile.refreshFromFileSystemSync();
      } else {
        configSourceFile = this.project.addSourceFileAtPath(configPath);
      }
    }

    configSourceFile.getExportedDeclarations().forEach((declarations, name) => {
      if (declarations.length > 1) return;
      const declaration = declarations[0] as any;
      switch (name) {
        case 'Params':
          routeConfig.params = `import('${path.resolve(page.dirPath, 'route.config').replace(/\\/g, '/')}').Params`;
          break;
        case 'BackData':
          routeConfig.backData = `import('${path.resolve(page.dirPath, 'route.config').replace(/\\/g, '/')}').BackData`;
          break;
        case 'Ext':
          routeConfig.ext = extractValue({
            name,
            declaration,
          });
          break;
      }
    });

    page.routeConfig = routeConfig;
  }

  loadMethod(page: Page) {
    const { routeConfig, dirName } = page;

    let methodName = 'to' + formatPageDir(dirName);
    const methodBody = `return Router.navigate({ url: "${page.path}"${
      routeConfig?.ext ? ', ext: ' + routeConfig.ext : ''
    } }, options)`;

    let method = `function (options) {${methodBody}}`;

    let methodType: string;

    let ReturnType = 'any';
    if (routeConfig?.backData) {
      ReturnType = routeConfig.backData;
    }

    if (!routeConfig || isNil(routeConfig.params)) {
      methodType =
        `<TBackData = ${ReturnType}, TParams = unknown>` +
        '(options?: NavigateOptions & Params<NoInfer<TParams>>) => Promise<TBackData>';
      page.method = new PageMethod({
        name: methodName,
        type: methodType,
        value: method,
      });
      return;
    }

    methodType =
      `<TBackData = ${ReturnType}, TParams = ${routeConfig.params ?? 'unknown'}>` +
      '(...options: RequiredKeys<NavigateOptions & Params<NoInfer<TParams>>> extends never ' +
      '? [options?: NavigateOptions & Params<NoInfer<TParams>>] : [options: NavigateOptions & Params<NoInfer<TParams>>]) => Promise<TBackData>';
    page.method = new PageMethod({
      name: methodName,
      type: methodType,
      value: method,
    });
  }
}
