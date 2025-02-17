import { View } from '@tarojs/components';
import { TaroElement } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import { getBoundingClientRect, mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { useCreation, useMemoizedFn, useMount } from 'ahooks';
import { useEffect, useRef, useState } from 'react';

export type ScrollTextProps = {
  /** 滚动的延迟 */
  delay?: number;
  /** 滚动的速度 */
  speed?: number;
  children?: React.ReactNode;
} & NativeProps;

const defaultProps: Required<Pick<ScrollTextProps, 'delay' | 'speed'>> = {
  delay: 1000,
  speed: 30,
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
    setOffset((current) => {
      const distance = Math.abs(-textWidth - current);
      setDuration(distance / props.speed);

      return -textWidth;
    });
  });

  const handleScrollEnd = useMemoizedFn(() => {
    setOffset(wrapperWidth);
    setDuration(0);

    Taro.nextTick(() => {
      startScroll();
    });
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
