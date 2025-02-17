import fs from 'fs-extra';
import * as path from 'path';
import { Piscina } from 'piscina';
import { Config } from '../../type/config';
import { componentsDir, cpus, currentPath, progressBarController } from '../constant';
import { writeFile } from '../utils/write-file';
import { createBaseComponents } from './create-base-components';

// @ts-ignore
const currentFilePath = import.meta.url.slice('file://'.length);
const generateComponent = new Piscina({
  filename: path.resolve(currentFilePath, '../generate-component.ts'),
  minThreads: cpus.length / 2,
  maxThreads: cpus.length / 2,
});

const parseCamelCase = (origin: string) => {
  return origin
    .toLocaleLowerCase()
    .replaceAll(/[\\/ _-][a-zA-Z]/g, (match) => match.slice(1).toLocaleUpperCase())
    .replace(/[a-zA-Z]/, (char) => char.toLocaleUpperCase());
};

export const updateComponents = async (config: Config) => {
  const { sourceDir, outputDir, className } = config;

  const processBar = progressBarController.create(100, 0, { name: '生成图标组件', current: '准备生成组件...' });

  const filenames = (await fs.readdir(path.resolve(currentPath, sourceDir), { encoding: 'utf-8' })).filter(
    (filename) => {
      const splitIndex = filename.lastIndexOf('.');
      const suffix = filename.slice(splitIndex);

      return suffix === '.svg';
    },
  );

  processBar.setTotal(filenames.length + 1 + 2);

  const componentsRootDir = path.resolve(currentPath, outputDir, componentsDir);

  processBar.increment(1, { current: '清理目录...' });

  // 清理目录
  await fs.remove(componentsRootDir);
  await fs.mkdir(componentsRootDir);

  processBar.increment(1, { current: '生成基础组件...' });

  // 生成基础组件
  await createBaseComponents(config);

  const componentIndexCodeArr: string[] = [];
  const tasks = filenames.map(async (filename) => {
    const splitIndex = filename.lastIndexOf('.');
    const iconName = filename.slice(0, splitIndex);
    const iconNameCamelCase = parseCamelCase(iconName);
    const svgSourcePath = path.resolve(currentPath, sourceDir, filename);

    componentIndexCodeArr.push(`export { ${iconNameCamelCase} } from './${iconName}';`);

    await generateComponent.run({
      svgSourcePath,
      componentsRootDir,
      iconNameCamelCase,
      filename,
      className,
      iconName,
    });

    processBar.increment(1, { current: `已生成 ${iconNameCamelCase}` });
  });
  processBar.increment(0, { current: '准备生成组件...' });

  await Promise.all(tasks);

  processBar.increment(1, { current: '生成导出文件...' });

  await writeFile(path.resolve(componentsRootDir, 'index.ts'), componentIndexCodeArr.join('\n'));

  processBar.update(100, { current: `已生成 ${tasks.length} 个图标组件` });
};
