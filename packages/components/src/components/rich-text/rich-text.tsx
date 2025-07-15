import { View } from '@tarojs/components';
import { NativeProps, withNativeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import { parseHtml } from './parsr-html';

export type RichTextProps = {
  source: string | undefined;
} & NativeProps;

export const RichText: React.FC<RichTextProps> = (props) => {
  const nodes = useCreation(() => {
    return parseHtml(props.source);
  }, [props.source]);

  return withNativeProps(props, <View className='heathen-rich-text'>{nodes}</View>);
};

export default RichText;
