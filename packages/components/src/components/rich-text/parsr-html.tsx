import {
  Image,
  RichText as TaroRichText,
  RichTextProps as TaroRichTextProps,
  Text,
  Video,
  View,
} from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'clsx';
import HTML, { ASTNode } from '../../utils/html-parse-stringify';

export const parseHtml = (html: string | undefined) => {
  if (!html) return null;
  const astNodes = HTML.parse(html);
  const imageUrls: string[] = [];

  const convertNode = (node: ASTNode, index?: number) => {
    if (node.type === 'text') {
      return <Text key={index}>{node.content}</Text>;
    } else if (node.type === 'tag' && node.name === 'video') {
      const firstChild = node.children?.[0];
      return (
        <Video
          key={index}
          {...(node?.attrs || {})}
          src={firstChild?.type === 'text' || !firstChild ? node.attrs.src : firstChild.attrs.src}
        />
      );
    } else if (node.type === 'tag' && (node.name === 'img' || node.name === 'image')) {
      const imageUrl = node?.attrs.src;
      imageUrls.push(imageUrl);
      // // 部分富文本编辑器创建的html中image标签没有结束，导致实际解析中任一image后面的元素都会被当作children
      // const children = (node.children || []).map((node, index) => convertNode(node, index));
      return (
        <>
          <Image
            key={index}
            mode='widthFix'
            src={imageUrl}
            {...(node?.attrs || {})}
            style={{
              width: '100%',
            }}
            onClick={() => {
              Taro.previewImage({
                urls: imageUrls,
                current: imageUrl,
              });
            }}
            showMenuByLongpress
          />
          {/* {children} */}
        </>
      );
    } else if (node.type === 'component') {
      return null;
    } else if (node.type === 'tag' && node.name === 'input' && node.attrs.type === 'checkbox') {
      const checked = Object.keys(node.attrs).includes('checked');
      return <View className={classnames('checkbox', { checked })} />;
    } else if (node.type === 'tag' && node.name === 'hr') {
      return <View className='divider' />;
    } else if (node.type === 'tag' && node.name === 'code') {
      const nodes: TaroRichTextProps['nodes'] = [
        {
          type: 'node',
          name: 'code',
          attrs: { ...node.attrs, class: classnames(node.attrs.class, 'code') },
          children: node.children?.map((item) => ({
            type: 'text',
            text: item.type === 'text' ? item.content : '',
          })),
        },
      ];
      return <TaroRichText nodes={nodes} />;
    } else if (node.type === 'tag' && node.name === 'ol') {
      const children = (node.children || []).map((_node, _index) => {
        const attrs = Object.assign((_node.type === 'text' ? {} : _node.attrs) || {}, { 'data-index': _index });
        const _children = ((_node.type === 'text' ? [] : _node.children) || []).map((__node, __index) =>
          convertNode(__node, __index),
        );
        return (
          <View {...attrs} key={index} className='li'>
            <Text className='mark'>{_index + 1}.</Text>
            <View>{_children}</View>
          </View>
        );
      });
      const attrs = Object.assign(node?.attrs || {}, { 'data-index': index });
      return (
        <View {...attrs} className='ol'>
          {children}
        </View>
      );
    } else {
      const children = (node.children || []).map((_node, _index) => convertNode(_node, _index));
      const className = node.name;
      const attrs = Object.assign(node?.attrs || {}, { 'data-index': index });
      return (
        <View
          key={index}
          {...attrs}
          data-index={index}
          className={classnames(className, attrs.class, { todo: attrs['data-w-e-type'] === 'todo' })}
        >
          {children}
        </View>
      );
    }
  };

  return astNodes.map((node, index) => convertNode(node, index)).filter((node) => node);
};
