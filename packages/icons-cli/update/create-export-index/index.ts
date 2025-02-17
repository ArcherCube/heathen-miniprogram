import path from 'path';
import { Config } from '../../type/config';
import { writeFile } from '../utils/write-file';
import { componentsDir, currentPath, fontName, fontsDir } from '../constant';

export const createExportIndex = async (config: Config) => {
  const { outputDir } = config;

  const rootPath = path.resolve(currentPath, outputDir);
  const componentsIndexPath = path.resolve(currentPath, outputDir, componentsDir);
  const fontsCssPath = path.resolve(currentPath, outputDir, fontsDir, `${fontName}.css`);

  const exportCodeLines = [
    `import './${path.relative(rootPath, fontsCssPath)}';`,
    `export * from './${path.relative(rootPath, componentsIndexPath)}'`,
  ];
  await writeFile(path.resolve(rootPath, 'index.ts'), exportCodeLines.join('\n'));
};
