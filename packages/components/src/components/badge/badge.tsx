import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { View } from '@tarojs/components';
import { useCreation } from 'ahooks';
import { clsx } from 'clsx';
import isNil from 'lodash-es/isNil';

export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type BadgePosition = 'middle' | 'inner';

export type BadgeProps = {
  /** 徽标内的信息。为空时会展示为红点 */
  content?: React.ReactNode;
  /** content为数字时，限制最大值 */
  max?: number;
  /** 距离中心放置的位置 */
  position?: BadgePosition;
  visible?: boolean;
  placement?: BadgePlacement;
  children?: React.ReactNode;
} & NativeProps<'--badge-color' | 'color'>;

const defaultProps: Required<Pick<BadgeProps, 'placement' | 'visible' | 'position'>> = {
  placement: 'top-right',
  visible: true,
  position: 'middle',
};

export const Badge: React.FC<BadgeProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const content = useCreation(() => {
    if (!props.content) {
      return undefined;
    }

    if (typeof props.content === 'number' && !isNil(props.max) && props.content > props.max) {
      return `${props.max}+`;
    }

    return props.content;
  }, [props.max, props.content]);

  return withNativeProps(
    props,
    <View className='heathen-badge'>
      {props.visible ? (
        <View
          className={clsx(
            'heathen-badge-content',
            `heathen-badge-content-${props.placement}`,
            `heathen-badge-content-${props.placement}-${props.position}`,
          )}
        >
          {content}
        </View>
      ) : null}
      {props.children}
    </View>,
  );
};
