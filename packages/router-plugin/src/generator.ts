import { processTypeEnum } from '@tarojs/helper/dist/constants';
import * as fs from 'fs';
import * as path from 'path';
import { Project, SourceFile } from 'ts-morph';
import { MAIN_PACKAGE_NAME } from './constant';
import { Page } from './entitys';
import { Plugin } from './plugin';

export class Generator {
  project: Project;
  routerSourceFile: SourceFile;
  targetModulePath: string;
  emitTimer: NodeJS.Timeout | undefined;

  constructor(private readonly root: Plugin) {
    this.targetModulePath = path.resolve(this.root.ctx.paths.nodeModulesPath, '@heathen/router');
    const tsConfigFilePath = path.resolve(this.targetModulePath, 'tsconfig.json');
    this.project = new Project({
      tsConfigFilePath,
    });
    this.routerSourceFile = this.project.addSourceFileAtPath(
      path.resolve(this.targetModulePath, './src/router/index.ts'),
    );
  }

  emit(force = false) {
    clearTimeout(this.emitTimer);
    const _emit = () => {
      // 删除原有的router文件
      fs.rmSync(path.resolve(this.targetModulePath, './dist/router/index.js'), { recursive: true, force: true });
      fs.rmSync(path.resolve(this.targetModulePath, './dist/router/index.js.map'), { recursive: true, force: true });
      fs.rmSync(path.resolve(this.targetModulePath, './dist/router/index.d.ts'), { recursive: true, force: true });

      this.routerSourceFile.refreshFromFileSystemSync();

      const tempSourceFile = this.project.createSourceFile('temp.ts', (writer) => {
        writer.writeLine('type NoInfer<T> = T extends infer U ? U : never;');
        writer.writeLine('type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]');
        writer.writeLine('type Data<Q> = RequiredKeys<Q> extends never ? { data?: Q } : { data: Q }');
        writer.writeLine('type Params<P> = RequiredKeys<P> extends never ? { params?: P } : { params: P }');
        writer.writeLine('class Router {');

        // 生成路由方法
        writer.write(this.generateMethods());

        // 生成app配置
        writer.write(this.generateAppConfig());

        // 生成记录了全部页面的对象
        // writer.write(this.generateAllPages());

        // 迁移页面对象集合
        writer.write(this.generatePages());

        writer.writeLine('}');
      });

      const routerClass = this.routerSourceFile.getClass('Router')!;
      const staticMembers = tempSourceFile.getClass('Router')!.getStaticMembers();
      this.routerSourceFile.addTypeAliases(tempSourceFile.getTypeAliases().map((m) => m.getStructure()));
      routerClass.addMembers(staticMembers.map((m) => m.getStructure() as any));

      this.routerSourceFile.emitSync();
      tempSourceFile.delete();
      this.root.log(processTypeEnum.REMIND, '👋 已成功生成');
    };

    if (force) {
      _emit();
    } else {
      this.emitTimer = setTimeout(_emit, 300);
    }
  }

  generateMethods() {
    let methodText = '';
    let packages = this.root.pages.reduce((store, page) => {
      let pages = store.get(page.packageName);
      if (!pages) {
        pages = [];
        store.set(page.packageName, pages);
      }
      pages.push(page);
      return store;
    }, new Map<string, Page[]>());

    for (const packageName of packages.keys()) {
      const pages = packages.get(packageName);
      if (packageName === MAIN_PACKAGE_NAME) {
        methodText += pages
          ?.map((page) => {
            return `static ${page.method?.name}: ${page.method?.type} = ${page.method?.value}`;
          })
          .join('\n\n');
      } else {
        methodText += `
        static ${packageName}: {
          ${pages
            ?.map((page) => {
              return `${page.method?.name}: ${page.method?.type}`;
            })
            .join(';\n')}
        } = {
          ${pages
            ?.map((page) => {
              return `${page.method?.name}: ${page.method?.value}`;
            })
            .join(',\n')}
        }
        `;
      }
    }

    return methodText;
  }

  generateAppConfig() {
    const subPackages = this.root.config.packages
      .filter((pkg) => pkg.name !== MAIN_PACKAGE_NAME)
      .map((pkg) => {
        return {
          root: pkg.pagePath.replace(`${this.root.ctx.paths.sourcePath}${path.sep}`, ''),
          pages: [] as string[],
        };
      });

    const appConfig: Required<Pick<Taro.AppConfig, 'pages' | 'subPackages'>> = { pages: [], subPackages };

    this.root.pages.forEach((currentPage) => {
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
    if (this.root.config.defaultPage) {
      appConfig.pages.sort((left) => {
        if (left === this.root.config.defaultPage) return -1;

        return 0;
      });
    }

    return `private static _appConfig = ${JSON.stringify(appConfig)};
    static getAppConfig = () => { return Router._appConfig };`;
  }

  generatePages() {
    const pages = this.root.pages.map((page) => {
      return {
        dirName: page.dirName,
        dirPath: page.dirPath,
        path: page.path,
        fullPath: page.fullPath,
        packageName: page.packageName,
      };
    });
    return `private static _pages = ${JSON.stringify(pages)}
    static getPages = () => { return Router._pages };`;
  }

  // generateAllPages() {
  //   const pages = this.root.pages.reduce(
  //     (store, page) => {
  //       if (page.method) {
  //         const pageName = page.method.name.slice(2).replace(/^(\w)/g, (_, letter: string) => {
  //           return letter.toLowerCase();
  //         });

  //         if (page.packageName === MAIN_PACKAGE_NAME) {
  //           return {
  //             ...store,
  //             [pageName]: {
  //               path: page.path,
  //               ext: page.routeConfig?.ext,
  //             },
  //           };
  //         } else {
  //           return {
  //             ...store,
  //             [page.packageName]: {
  //               ...(store[page.packageName] || {}),
  //               [pageName]: {
  //                 path: page.path,
  //                 ext: page.routeConfig?.ext,
  //               },
  //             },
  //           };
  //         }
  //       }
  //       return store;
  //     },
  //     {} as Record<string, { path: string; ext: any }>,
  //   );

  //   return `static getPages = ()=>{return ${JSON.stringify(pages)}}`;
  // }
}
