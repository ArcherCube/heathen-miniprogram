import { Config, Page } from '../type';

type GenerateGetPagesMethodParams = {
  pages: Page[];
  config: Config;
};

export const generateGetPagesMethod = ({ pages }: GenerateGetPagesMethodParams) => {
  return `private static _pages = ${JSON.stringify(pages)}
  static getPages = () => { return Router._pages };`;
};
