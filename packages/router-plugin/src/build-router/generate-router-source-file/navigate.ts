import { MAIN_PACKAGE_NAME } from '../../constant';
import { Config, Page } from '../../type';
import { formatPageDir } from '../../utils';

type GenerateRouterNavigateMethodParams = {
  pages: Page[];
  config: Config;
};

type RouterNavigateMethodConfig = {
  path: string[];
  name: string;
  comment: string;
  type: string;
  body: string;
};

export const generateRouterNavigateMethod = ({ pages }: GenerateRouterNavigateMethodParams) => {
  const packageMethodConfigs = pages.reduce((store, page) => {
    const methodPath = [page.packageName, ...page.dirName.split('/')];
    const methodName = 'to' + formatPageDir(page.dirName);
    const methodComment = `/** [View page component](${page.dirPath}/${page.pageFileName}) */`;
    const methodReturnType = page.routeConfig?.backData ?? 'any';
    const methodType = page.routeConfig?.params
      ? `<TBackData = ${methodReturnType}, TParams = ${page.routeConfig?.params ?? 'unknown'}>` +
        '(...options: RequiredKeys<NavigateOptions & Params<NoInfer<TParams>>> extends never ' +
        '? [options?: NavigateOptions & Params<NoInfer<TParams>>] : [options: NavigateOptions & Params<NoInfer<TParams>>]) => Promise<TBackData>'
      : `<TBackData = ${methodReturnType}, TParams = unknown>` +
        '(options?: NavigateOptions & Params<NoInfer<TParams>>) => Promise<TBackData>';
    const methodBody = `function (options) {return Router.navigate({ url: "${page.path}"${
      page.routeConfig?.ext ? ', ext: ' + page.routeConfig.ext : ''
    } }, options)}`;

    let methodConfigs = store.get(page.packageName);
    if (!methodConfigs) {
      methodConfigs = [];
      store.set(page.packageName, methodConfigs);
    }
    methodConfigs.push({
      path: methodPath,
      name: methodName,
      comment: methodComment,
      type: methodType,
      body: methodBody,
    });
    return store;
  }, new Map<string, RouterNavigateMethodConfig[]>());

  let methodText = '';
  for (const packageName of packageMethodConfigs.keys()) {
    const methodConfigs = packageMethodConfigs.get(packageName);
    if (packageName === MAIN_PACKAGE_NAME) {
      methodText += methodConfigs
        ?.map((methodConfig) => {
          return `${methodConfig.comment}\nstatic ${methodConfig.name}: ${methodConfig.type} = ${methodConfig.body}`;
        })
        .join('\n\n');
    } else {
      methodText += `
          static ${packageName}: {
            ${methodConfigs
              ?.map((methodConfig) => {
                return `${methodConfig.comment}\n${methodConfig.name}: ${methodConfig.type}`;
              })
              .join(';\n')}
          } = {
            ${methodConfigs
              ?.map((methodConfig) => {
                return `${methodConfig.name}: ${methodConfig.body}`;
              })
              .join(',\n')}
          }
          `;
    }
  }

  return methodText;
};
