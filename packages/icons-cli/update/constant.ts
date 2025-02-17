import ProgressBar from 'cli-progress';
import chalk from 'chalk';
import * as os from 'os';

export const currentPath = process.cwd();

export const fontName = 'font' as const;
export const fontsDir = 'fonts' as const;
export const componentsDir = 'components' as const;
export const componentsTemplateDir = 'base' as const;
export const componentsTemplateStyleDir = 'style' as const;
export const svgIconTemplateDir = 'svg-icon' as const;
export const fontIconTemplateDir = 'font-icon' as const;

export const cpus = os.cpus();
export const tempDir = os.tmpdir();

const COMPLETE_CHAR = '█';
const INCOMPLETE_CHAR = ' ';
const BAR_MAX_CHAR_COUNT = 50;
export const progressBarController = new ProgressBar.MultiBar({
  clearOnComplete: false,
  hideCursor: true,

  format: (_, params, payload) => {
    const percent = params.value / params.total;
    const completeCharCount = Math.floor(percent * BAR_MAX_CHAR_COUNT);
    const incompleteCharCount = BAR_MAX_CHAR_COUNT - completeCharCount;
    if (params.value < params.total) {
      const bar = `${COMPLETE_CHAR.repeat(completeCharCount)}${INCOMPLETE_CHAR.repeat(incompleteCharCount)}`;
      return `${payload.name} [${bar}] ${payload.current}`;
    }

    return `${chalk.green('\u2714')} ${payload.current}`;
  },
});
