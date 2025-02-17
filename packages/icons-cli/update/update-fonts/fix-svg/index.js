import fs from 'fs-extra';
import Fixer from './fixer';

// type FixSvgParams = {
//   sourceFilePath: string;
//   outputFilePath: string;
//   resolution?: number;
// };

export default async (params) => {
  const { sourceFilePath, outputFilePath, resolution = 1024 } = params;

  const fixer = new Fixer(sourceFilePath, resolution);

  const result = await fixer.process();

  await fs.writeFile(outputFilePath, result);
};
