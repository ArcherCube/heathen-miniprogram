import { View } from '@tarojs/components';
import { TaroElement } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import useCreation from 'ahooks/es/useCreation';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import useMount from 'ahooks/es/useMount';
import { useEffect, useRef, useState } from 'react';
import { getBoundingClientRect, mergeProps, NativeProps, withNativeProps } from '@heathen/utils';

export type ScrollTextProps = {
  /** 滚动的延迟 */
  delay?: number;
  /** 滚动的速度 */
  speed?: number;
  /** 每次滚动开始的回调 */
  onScrollStart?: () => void;
  /** 每次滚动结束的回调 */
  onScrollEnd?: () => void;
  /** 是否无限滚动 */
  infinite?: boolean;
  children?: React.ReactNode;
} & NativeProps;

const defaultProps: Required<Pick<ScrollTextProps, 'delay' | 'speed' | 'infinite'>> = {
  delay: 1000,
  speed: 30,
  infinite: true,
};

export const ScrollText: React.FC<ScrollTextProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const wrapperRef = useRef<TaroElement>();
  const textRef = useRef<TaroElement>();
  const delayTimerRef = useRef<NodeJS.Timeout>();

  const startScroll = useMemoizedFn(() => {
    props.onScrollStart?.();

    setOffset((current) => {
      const distance = Math.abs(-textWidth - current);
      setDuration(distance / props.speed);

      return -textWidth;
    });
  });

  const handleScrollEnd = useMemoizedFn(() => {
    setOffset(wrapperWidth);
    setDuration(0);

    props.onScrollEnd?.();

    if (props.infinite) {
      Taro.nextTick(() => {
        startScroll();
      });
    }
  });

  useMount(() => {
    getBoundingClientRect(wrapperRef).then((res) => {
      setWrapperWidth(res.width);
    });
    getBoundingClientRect(textRef).then((res) => {
      setTextWidth(res.width);
    });
  });

  useEffect(() => {
    setShouldScroll(textWidth > wrapperWidth);
  }, [wrapperWidth, textWidth]);

  useEffect(() => {
    if (shouldScroll) {
      if (!delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = undefined;
      }
      delayTimerRef.current = setTimeout(() => {
        startScroll();
      }, props.delay);
    }
  }, [shouldScroll, startScroll, props.delay]);

  const textStyle = useCreation<React.CSSProperties>(() => {
    return {
      transform: `translate(${offset}px,0)`,
      transitionDuration: `${duration}s`,
    };
  }, [wrapperWidth, offset, duration]);

  return withNativeProps(
    props,
    <View ref={wrapperRef} className='heathen-scroll-text'>
      <View ref={textRef} className='heathen-scroll-text-content' style={textStyle} onTransitionEnd={handleScrollEnd}>
        {props.children}
      </View>
    </View>,
  );
};
