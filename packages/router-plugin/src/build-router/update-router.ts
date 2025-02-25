import fs from 'fs';
import path from 'path';
import { SourceFile } from 'ts-morph';
import { tsProject } from './common';
import { TARGET_MODULE_PATH } from './constant';
import { Config } from './type';

type UpdateRouterParams = {
  config: Config;
  newSourceFile: SourceFile;
};

export const updateRouter = ({ newSourceFile }: UpdateRouterParams) => {
  // 删除原有的router文件
  fs.rmSync(path.resolve(TARGET_MODULE_PATH, './dist/router/index.js'), { recursive: true, force: true });
  fs.rmSync(path.resolve(TARGET_MODULE_PATH, './dist/router/index.js.map'), { recursive: true, force: true });
  fs.rmSync(path.resolve(TARGET_MODULE_PATH, './dist/router/index.d.ts'), { recursive: true, force: true });

  const routerSourceFile = tsProject.addSourceFileAtPath(path.resolve(TARGET_MODULE_PATH, './src/router/index.ts'));

  routerSourceFile.refreshFromFileSystemSync();

  const routerClass = routerSourceFile.getClass('Router')!;
  const staticMembers = newSourceFile.getClass('Router')!.getStaticMembers();
  routerSourceFile.addTypeAliases(newSourceFile.getTypeAliases().map((m) => m.getStructure()));
  routerClass.addMembers(staticMembers.map((m) => m.getStructure() as any));

  routerSourceFile.emitSync();
};
