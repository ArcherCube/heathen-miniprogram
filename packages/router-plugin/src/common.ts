import path from 'path';
import { Project } from 'ts-morph';
import { TARGET_MODULE_PATH } from './constant';

const tsConfigFilePath = path.resolve(TARGET_MODULE_PATH, 'tsconfig.json');
export const tsProject = new Project({
  tsConfigFilePath,
});
