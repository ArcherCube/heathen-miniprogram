import { createAbortablePromise } from '@heathen/utils';
import { useCreation, useMemoizedFn, useSafeState } from 'ahooks';
import { useEffect, useState } from 'react';
import { AnimationFrame, doAnimation, parseAnimationFrameToStyle } from './animation';

export type AnimationType = 'show' | 'close';

export type AnimationConfig = Record<AnimationType, AnimationFrame[]>;

export type UseLayerOption = {
  visible?: boolean;
  afterShow?: () => void;
  afterClose?: () => void;
  animation?: {
    mask?: AnimationConfig;
    body?: AnimationConfig;
  };
};

/**
 * 处理layer渲染、动画的逻辑
 */
export const useLayer = (option: UseLayerOption) => {
  const { visible, afterClose, afterShow, animation } = option;

  const { maskInitStyle, bodyInitStyle } = useCreation(() => {
    return {
      maskInitStyle: Object.assign({}, ...(animation?.mask?.close?.map((frame) => frame.style) ?? [])),
      bodyInitStyle: Object.assign({}, ...(animation?.body?.close?.map((frame) => frame.style) ?? [])),
    };
  }, [animation]);

  const [shouldRender, setShouldRender] = useState<boolean | undefined>(visible);
  const [maskStyle, setMaskStyle] = useSafeState<React.CSSProperties>(maskInitStyle);
  const [bodyStyle, setBodyStyle] = useSafeState<React.CSSProperties>(bodyInitStyle);

  // 可见时立刻设置渲染
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
  }, [visible]);

  // 动画结束的回调。
  const handleAnimationEnd = useMemoizedFn(() => {
    if (visible) {
      afterShow?.();
    } else {
      setShouldRender(false);
      afterClose?.();
    }
  });

  // visible变化后执行动画
  useEffect(() => {
    const animationType: AnimationType = visible ? 'show' : 'close';
    const animationPromise = createAbortablePromise(
      Promise.allSettled([
        doAnimation(animation?.mask?.[animationType], (frame) => {
          setMaskStyle(parseAnimationFrameToStyle(frame));
        }),
        doAnimation(animation?.body?.[animationType], (frame) => {
          setBodyStyle(parseAnimationFrameToStyle(frame));
        }),
      ]),
    );
    animationPromise.then(handleAnimationEnd);

    return () => {
      animationPromise.abort(new Error('[Layer]: animation aborted.'));
    };
  }, [animation, handleAnimationEnd, visible, setBodyStyle, setMaskStyle]);

  return {
    shouldRender,
    maskStyle,
    bodyStyle,
  };
};
