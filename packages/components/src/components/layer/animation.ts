import Taro from '@tarojs/taro';
import kebabCase from 'lodash-es/kebabCase';

export type AnimationFrame = {
  /** 帧时长，单位ms */
  duration?: number;
  /** 帧时间曲线 */
  ease?: React.CSSProperties['transitionTimingFunction'];
  /**
   * 帧样式。支持传入函数，参数为layer子元素的rect信息
   * - 目前约定取layer的第一个子元素进行rect信息获取
   * - 目前初始帧不会带有rect信息，一般不影响使用
   **/
  style:
    | ((rect: Taro.NodesRef.BoundingClientRectCallbackResult | undefined) => React.CSSProperties)
    | React.CSSProperties;
};

/**
 * 转换帧动画配置为样式
 */
export const parseAnimationFrameToStyle = (
  frame: AnimationFrame,
  rect?: Taro.NodesRef.BoundingClientRectCallbackResult | undefined,
): React.CSSProperties => {
  const style = typeof frame.style === 'function' ? frame.style(rect) : frame.style;
  return {
    transitionTimingFunction: frame.ease,
    transitionDuration: `${frame.duration}ms`,
    transitionProperty: Object.keys(style)
      .map((key) => kebabCase(key))
      .join(','),
    ...style,
  };
};

/**
 * 执行一组帧动画
 */
export const doAnimation = (
  animationFrames: AnimationFrame[] | undefined,
  callback: (animationFrame: AnimationFrame) => void,
) => {
  let result = Promise.resolve();

  if (animationFrames?.length) {
    for (let A = 0; A < animationFrames.length; ++A) {
      result = result.then(() => {
        const currentAnimationFrame = animationFrames[A];
        return new Promise((resolve) => {
          callback(currentAnimationFrame);
          setTimeout(() => {
            resolve();
          }, currentAnimationFrame.duration);
        });
      });
    }
  }

  return result;
};
