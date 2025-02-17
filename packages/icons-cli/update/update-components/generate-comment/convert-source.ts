export type ConvertSvgSourceOptions = {
  color?: string[] | string;
};

const PATH_REGEXP = /<path[^<>]+>/g;
const PATH_FILL_REPLACE_REGEXP = /fill=["'][^>"']*["']/g;
const PATH_STROKE_REPLACE_REGEXP = /stroke=["'][^>"']*["']/g;

export const convertSvgSource = (source: string, options?: ConvertSvgSourceOptions) => {
  let result = source;
  if (options) {
    if (options.color) {
      const colors = typeof options.color === 'string' ? [options.color] : options.color;
      if (colors[0]) {
        let index = 0;
        result = result.replaceAll(PATH_REGEXP, (pathTag) => {
          let replacePathTag = pathTag.replaceAll(PATH_FILL_REPLACE_REGEXP, () => {
            return `fill="${colors[index % colors.length]}"`;
          });
          replacePathTag = replacePathTag.replaceAll(PATH_STROKE_REPLACE_REGEXP, () => {
            return `stroke="${colors[index % colors.length]}"`;
          });
          ++index;
          return replacePathTag;
        });
      }
    }
  }

  return result;
};
