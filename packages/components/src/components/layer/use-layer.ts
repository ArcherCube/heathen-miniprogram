import { TaroElement } from '@tarojs/runtime';
import { createAbortablePromise, getBoundingClientRect, mergeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import useSafeState from 'ahooks/es/useSafeState';
import { useEffect, useRef, useState } from 'react';
import { AnimationFrame, doAnimation, parseAnimationFrameToStyle } from './animation';

export type AnimationType = 'show' | 'close';

export type AnimationConfig = Record<AnimationType, AnimationFrame[]>;

export type UseLayerOption = {
  visible?: boolean;
  destoryOnClose?: boolean;
  afterShow?: () => void;
  afterClose?: () => void;
  animation?: {
    mask?: AnimationConfig;
    body?: AnimationConfig;
  };
};

const defaultFrameTransition: Required<Pick<AnimationFrame, 'ease' | 'duration'>> = {
  ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
  duration: 500,
};

/**
 * 处理layer渲染、动画的逻辑
 */
export const useLayer = (option: UseLayerOption) => {
  const { visible, destoryOnClose, afterClose, afterShow, animation: _animation } = option;
  const bodyRef = useRef<TaroElement>();

  const animation = useCreation<typeof _animation>(() => {
    if (_animation) {
      const newAnimationEntries = Object.entries(_animation).map(([partName, config]) => {
        const newConfigEntries = Object.entries(config).map(([animationName, frames]) => {
          return [animationName, frames.map((frame) => mergeProps(defaultFrameTransition, frame))];
        });

        return [partName, Object.fromEntries(newConfigEntries)];
      });

      return Object.fromEntries(newAnimationEntries);
    }
    return undefined;
  }, [_animation]);

  const { maskInitStyle, bodyInitStyle } = useCreation(() => {
    return {
      maskInitStyle: Object.assign(
        {},
        ...(animation?.mask?.close?.map((frame) => {
          return typeof frame.style === 'function' ? frame.style(undefined) : frame.style;
        }) ?? []),
      ),
      bodyInitStyle: Object.assign(
        {},
        ...(animation?.body?.close?.map((frame) => {
          return typeof frame.style === 'function' ? frame.style(undefined) : frame.style;
        }) ?? []),
      ),
    };
  }, [animation]);

  const [shouldRender, setShouldRender] = useState<boolean | undefined>(visible);
  const [maskStyle, setMaskStyle] = useSafeState<React.CSSProperties>(maskInitStyle);
  const [bodyStyle, setBodyStyle] = useSafeState<React.CSSProperties>(bodyInitStyle);
  const [layerStyle, setLayerStyle] = useSafeState<React.CSSProperties>({});

  // 可见时立刻设置渲染
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setLayerStyle({});
    }
  }, [setLayerStyle, visible]);

  // 动画结束的回调。
  const handleAnimationEnd = useMemoizedFn(() => {
    if (visible) {
      afterShow?.();
    } else {
      if (destoryOnClose) {
        setShouldRender(false);
      } else {
        setLayerStyle({ display: 'none' });
      }
      afterClose?.();
    }
  });

  // visible变化后执行动画
  useEffect(() => {
    const animationType: AnimationType = visible ? 'show' : 'close';

    // 动画配置带有函数的style时，解析body子节点（当前来说默认第一个节点）的rect信息；否则不处理rect
    let rectPromise: Promise<Taro.NodesRef.BoundingClientRectCallbackResult | undefined> = Promise.resolve(undefined);
    if (bodyRef.current && animation?.body?.show.some((frame) => typeof frame.style === 'function')) {
      rectPromise = getBoundingClientRect({ current: bodyRef.current.children[0] });
    }

    const animationPromise = createAbortablePromise(
      rectPromise.then((childRect) => {
        return Promise.allSettled([
          doAnimation(animation?.mask?.[animationType], (frame) => {
            setMaskStyle(parseAnimationFrameToStyle(frame, childRect));
          }),
          doAnimation(animation?.body?.[animationType], (frame) => {
            setBodyStyle(parseAnimationFrameToStyle(frame, childRect));
          }),
        ]);
      }),
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
    layerStyle,
    bodyRef,
  };
};
