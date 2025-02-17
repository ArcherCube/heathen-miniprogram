import fs from 'fs-extra';

import { ESLint } from 'eslint';

const eslint = new ESLint({
  fix: true,
});

const lintFixFile = async (filePath: string) => {
  if (!filePath) return Promise.reject(new Error('[lintFile]: 路径为空'));

  return eslint.lintFiles([filePath]).then((results) => {
    return ESLint.outputFixes(results);
  });
};

export const writeFile = (filePath: string, content: string) => {
  return fs
    .writeFile(filePath, content, {
      encoding: 'utf-8',
      flag: 'w+',
    })
    .then(() => {
      return lintFixFile(filePath);
    });
};
