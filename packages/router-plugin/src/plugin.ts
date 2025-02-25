import { IPluginContext } from '@tarojs/service';
import { buildRouter } from './build-router';
import { MAIN_PACKAGE_NAME } from './build-router/constant';
import { Config, Page } from './build-router/type';

export class Plugin {
  isWatch: boolean;
  helper: typeof import('@tarojs/helper');

  pages: Page[] = [];

  constructor(
    public readonly ctx: IPluginContext,
    public config: Config,
  ) {
    this.helper = this.ctx.helper;

    this.config.packages = this.config.packages ?? [];
    if (this.config.packages.findIndex((pkg) => pkg.name === MAIN_PACKAGE_NAME) === -1) {
      throw new Error('找不到主包配置，请检查插件配置中是否包含 name 为 main 的 package。');
    }
    this.config.ignore = this.config.ignore ?? ['.DS_Store'];

    this.isWatch = !!(this.ctx.runOpts.options.isWatch || this.ctx.runOpts.options.watch);
  }

  register() {
    this.ctx.onBuildStart(() => {
      buildRouter(this.config);
      console.log();
    });
    return this;
  }

  // registerCommand() {
  //   const { ctx } = this;
  //   ctx.registerCommand({
  //     name: 'router-gen',
  //     optionsMap: {
  //       '--watch': '监听页面信息变化自动生成 Router',
  //     },
  //     synopsisList: ['taro router-gen 生成 Router', 'taro router-gen --watch 监听页面信息变化自动生成 Router'],
  //     fn: () => this.start(),
  //   });
  //   return this;
  // }

  // watch() {
  //   const { ctx } = this;
  //   this.log(processTypeEnum.REMIND, '正在监听页面变化自动生成 Router.to...');
  //   const loadPge = (pageDirPath: string, pkg: IConfigPackage) => {
  //     if (this.loader.loadPage(pageDirPath, pkg)) this.generator.emit();
  //   };

  //   for (const pkg of this.config.packages) {
  //     const onChange = (value: string) => {
  //       if (value.endsWith('route.config.ts')) value = value.replace(`${path.sep}route.config.ts`, '');
  //       loadPge(value, pkg);
  //     };

  //     ctx.helper.chokidar
  //       .watch(pkg.pagePath, { ignoreInitial: true, depth: 0 })
  //       .on('addDir', onChange)
  //       .on('unlinkDir', onChange);

  //     ctx.helper.chokidar
  //       .watch(path.resolve(pkg.pagePath, '**/route.config.ts'), {
  //         ignoreInitial: true,
  //         depth: 1,
  //       })
  //       .on('add', onChange)
  //       .on('change', onChange)
  //       .on('unlink', onChange);
  //   }
  // }
}
