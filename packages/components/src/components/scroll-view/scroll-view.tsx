import { ScrollView as TaroScrollView, type ScrollViewProps as TaroScrollViewProps } from '@tarojs/components';
import { mergeProps } from '@heathen/utils';

export type ScrollViewProps = TaroScrollViewProps;

const defaultProps: Required<Pick<ScrollViewProps, 'refresherBackground'>> = {
  refresherBackground: 'transparent',
};

export const ScrollView: React.FC<ScrollViewProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  // 微信的一些莫名其妙的机制：
  // refresherTriggered 本应只是一个下拉状态的控制，但微信内部设置了当它从false变为true时会引发 onRefresherRefresh，造成重复刷新
  // 所以处理当 refresherTriggered 为true时，onRefresherRefresh 不会执行操作
  const onRefresherRefresh = props.refresherTriggered ? undefined : props.onRefresherRefresh;

  return <TaroScrollView {...props} onRefresherRefresh={onRefresherRefresh} />;
};
