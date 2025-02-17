export type AnimationFrame = {
  /** 帧时长，单位ms */
  duration: number;
  /** 帧时间曲线 */
  ease: React.CSSProperties['transitionTimingFunction'];
  /** 帧样式 */
  style: React.CSSProperties;
};

/**
 * 转换帧动画配置为样式
 */
export const parseAnimationFrameToStyle = (frame: AnimationFrame): React.CSSProperties => {
  return {
    transitionTimingFunction: frame.ease,
    transitionDuration: `${frame.duration}ms`,
    transitionProperty: Object.keys(frame.style).join(','),
    ...frame.style,
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
