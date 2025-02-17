import path from 'path';
import fs from 'fs-extra';
import { Config } from '../../../type/config';
import {
  componentsDir,
  componentsTemplateDir,
  componentsTemplateStyleDir,
  currentPath,
  fontIconTemplateDir,
  svgIconTemplateDir,
} from '../../constant';
import { codeLines as fontIconComponentCodeLines } from './template/components/font-icon';
import { codeLines as styleImportCodeLines } from './template/components/style';
import { codeLines as styleDefineCodeLines } from './template/components/style/icon';
import { codeLines as svgIconComponentCodeLines } from './template/components/svg-icon';
import { writeFile } from '../../utils/write-file';

// @ts-ignore
const currentFilePath = import.meta.url.slice('file://'.length);

export const createBaseComponents = async ({ outputDir, className }: Config) => {
  const baseComponentsRootDir = path.resolve(currentPath, outputDir, componentsDir, componentsTemplateDir);

  await fs.mkdir(baseComponentsRootDir);

  const styleImportCodePromise = (async () => {
    const styleDir = path.resolve(baseComponentsRootDir, componentsTemplateStyleDir);
    await fs.mkdir(styleDir);

    await Promise.all([
      writeFile(path.resolve(styleDir, 'icon.css'), styleDefineCodeLines(className).join('\n')),
      writeFile(path.resolve(styleDir, 'index.ts'), styleImportCodeLines().join('\n')),
    ]);
  })();

  const fontIconComponentCodePromise = (async () => {
    const componentDir = path.resolve(baseComponentsRootDir, fontIconTemplateDir);

    await fs.mkdir(componentDir);

    await writeFile(path.resolve(componentDir, 'index.tsx'), fontIconComponentCodeLines(className).join('\n'));
  })();

  const svgIconComponentCodePromise = (async () => {
    const componentDir = path.resolve(baseComponentsRootDir, svgIconTemplateDir);

    await fs.mkdir(componentDir);

    const sourceDir = path.resolve(currentFilePath, '../../generate-comment');
    await Promise.all([
      writeFile(path.resolve(componentDir, 'index.tsx'), svgIconComponentCodeLines(className).join('\n')),
      fs.copyFile(path.resolve(sourceDir, 'convert-source.ts'), path.resolve(componentDir, 'convert-source.ts')),
      fs.copyFile(path.resolve(sourceDir, 'svg64.ts'), path.resolve(componentDir, 'svg64.ts')),
    ]);
  })();

  await Promise.all([styleImportCodePromise, fontIconComponentCodePromise, svgIconComponentCodePromise]);
};
