import { svg64 } from './svg64';
import { convertSvgSource } from './convert-source';

const colorList = ['#fff', '#f00', '#ff0', '#00f', '#0f0', '#0ff', '#f0f', '#000'];
const colorPanelSvgSource = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 33C28.9706 33 33 28.9706 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33Z" fill="#333" stroke="#333" stroke-width="4"/></svg>`;

const fixSvgSize = (source: string, size: { width: number; height: number }) => {
  return source.replace(/(?<=\<svg[^\>]+)>/, (m) => {
    return ` width="${size.width}" height="${size.height}" ${m}`;
  });
};

export const generateComment = ({ name, source }: { name: string; source: string }) => {
  const comments: string[] = [];

  const parseSource = svg64(
    convertSvgSource(fixSvgSize(source, { width: 60, height: 60 }), {
      color: colorList,
    }),
  );

  comments.push(`![${name}](${parseSource})`);

  const colorCount = Array.from(source.matchAll(/<path[^<>]+>/g)).length;

  if (colorCount > 1) {
    comments.push(``);
    comments.push(`---`);
    comments.push(``);

    comments.push(`支持最多配置 ${colorCount} 个颜色，按顺序分别为`);

    for (let A = 0; A < colorCount; ++A) {
      const colorPanelSvg = svg64(
        convertSvgSource(fixSvgSize(colorPanelSvgSource, { width: 24, height: 24 }), {
          color: colorList[A],
        }),
      );
      comments.push(`![${colorList[A]}](${colorPanelSvg})`);
    }
  }

  return `/**\n${comments.map((comment) => ` *${comment ? ` ${comment}` : ''}`).join('\n')}\n */`;
};
