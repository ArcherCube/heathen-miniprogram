import { tsProject } from '../../common';
import { Config, Page } from '../../type';
import { generateRouterNavigateMethod } from './navigate';
import { generateGetPagesMethod } from './pages';

type GenerateRouterMethodsParams = {
  pages: Page[];
  config: Config;
};

export const generateRouterSourceFile = (params: GenerateRouterMethodsParams) => {
  const tempSourceFile = tsProject.createSourceFile('temp.ts', (writer) => {
    writer.writeLine('type NoInfer<T> = T extends infer U ? U : never;');
    writer.writeLine('type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]');
    writer.writeLine('type Data<Q> = RequiredKeys<Q> extends never ? { data?: Q } : { data: Q }');
    writer.writeLine('type Params<P> = RequiredKeys<P> extends never ? { params?: P } : { params: P }');
    writer.writeLine('class Router {');

    // 生成路由方法
    writer.write(generateRouterNavigateMethod(params));

    // 迁移页面对象集合
    writer.write(generateGetPagesMethod(params));

    writer.writeLine('}');
  });

  return tempSourceFile;
};
