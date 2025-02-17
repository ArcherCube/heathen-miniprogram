import fs from 'fs-extra';
import * as path from 'path';
import { componentsTemplateDir, fontIconTemplateDir, svgIconTemplateDir } from '../constant';
import { writeFile } from '../utils/write-file';
import { generateComment } from './generate-comment';

type GenerateComponentParams = {
  svgSourcePath: string;
  componentsRootDir: string;
  iconNameCamelCase: string;
  filename: string;
  className: string;
  iconName: string;
};
// @ts-ignore
export const fileFullPath = import.meta.url;

export default async (params: GenerateComponentParams) => {
  const { svgSourcePath, componentsRootDir, iconNameCamelCase, filename, className, iconName } = params;

  const fileSource = await fs.readFile(svgSourcePath, { encoding: 'utf-8' });

  const code = [
    `import { Icon as SvgIcon } from './${componentsTemplateDir}/${svgIconTemplateDir}';`,
    `import { Icon as FontIcon } from './${componentsTemplateDir}/${fontIconTemplateDir}';`,
    `import svgSource from '${path.relative(componentsRootDir, svgSourcePath)}';`,
    `export type ${iconNameCamelCase}Props = Omit<React.ComponentProps<typeof SvgIcon> & React.ComponentProps<typeof FontIcon>, 'type'>;`,
    generateComment({ name: filename, source: fileSource }),
    `export const ${iconNameCamelCase}: React.FC<${iconNameCamelCase}Props> = (props) => {`,
    `  if (props.color) {`,
    `    return <SvgIcon type={svgSource} {...props} />;`,
    `  }`,
    `  return <FontIcon type='${className}-${iconName}' {...props} />;`,
    `};`,
  ].join('\n');

  const componentFilePath = path.resolve(componentsRootDir, `${iconName}.tsx`);
  await writeFile(componentFilePath, code);
};
