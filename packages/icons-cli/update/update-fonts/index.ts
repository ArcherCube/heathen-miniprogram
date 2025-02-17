import fs from 'fs-extra';
import * as path from 'path';
import { Piscina } from 'piscina';
import svgToFont from 'svgtofont';
import { Config } from '../../type/config';
import { cpus, currentPath, fontName, fontsDir, progressBarController, tempDir } from '../constant';

const tempDirPrefix = 'icons-cli-svg-fixed-';
// @ts-ignore
const currentFilePath = import.meta.url.slice('file://'.length);
const fixSvg = new Piscina({
  filename: path.resolve(currentFilePath, '../fix-svg/index.js'),
  minThreads: cpus.length / 2,
  maxThreads: cpus.length / 2,
});

export const updateFonts = async ({ sourceDir, outputDir, className }: Config) => {
  const processBar = progressBarController.create(100, 0, { name: '生成字体文件', current: '准备生成字体...' });

  const fixedSvgDir = fs.mkdtempSync(path.resolve(tempDir, tempDirPrefix), { encoding: 'utf-8' });

  const filenames = (await fs.readdir(path.resolve(currentPath, sourceDir), { encoding: 'utf-8' })).filter(
    (filename) => {
      const splitIndex = filename.lastIndexOf('.');
      const suffix = filename.slice(splitIndex);

      return suffix === '.svg';
    },
  );

  processBar.setTotal(filenames.length + 1);

  const fixedTasks = filenames.map(async (filename) => {
    await fixSvg.run({
      sourceFilePath: path.resolve(currentPath, sourceDir, filename),
      outputFilePath: path.resolve(fixedSvgDir, filename),
    });

    processBar.increment(1, { current: `已修正 ${filename}` });
  });

  await Promise.all(fixedTasks);

  processBar.increment(0, { current: '生成字体...' });

  const fontInfoData = await svgToFont({
    src: fixedSvgDir,
    dist: path.resolve(currentPath, outputDir, fontsDir),
    emptyDist: true,
    fontName: fontName,
    classNamePrefix: className,
    css: {
      include: /\.css/,
      fontSize: 'inherit',
    },
    log: false,
    svgoOptions: {
      multipass: true,
      plugins: [
        { name: 'convertShapeToPath', params: { convertArcs: true } }, // 将形状转换为路径
        { name: 'removeViewBox' }, // 可选：保留 viewBox
        { name: 'removeTitle' }, // 可选：移除 <title> 标签
        { name: 'removeDimensions' }, // 可选：移除宽度和高度属性
      ],
    },
    svgicons2svgfont: {
      fixedWidth: true,
      fontHeight: 9999,
      normalize: true,
      centerHorizontally: true,
      centerVertically: true,
      // descent: 7,
    },
    excludeFormat: ['svg', 'symbol.svg', 'eot'],
  });

  processBar.increment(1, { current: '删除临时文件...' });
  await fs.remove(fixedSvgDir);

  processBar.update(100, { current: `已生成 ${Object.keys(fontInfoData).length} 个图标的字体文件` });

  return;
};
