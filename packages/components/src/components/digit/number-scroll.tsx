import { View } from '@tarojs/components';
import { useCreation, useMemoizedFn } from 'ahooks';
import { useContext, useEffect, useId, useState } from 'react';
import { DigitContext } from './context';

type NumberScrollProps = {
  value: number;
};

const NUMBER_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const NumberScroll: React.FC<NumberScrollProps> = (props) => {
  const idPrefix = `heathen-number-scroll-${useId()}`;
  const [translateY, setTranslateY] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { height, animation, animationDuration, animationEasing } = useContext(DigitContext);

  const showAnimateList = useCreation(() => animation && isAnimating, [animation, isAnimating]);

  useEffect(() => {
    if (animation) {
      const newTranslateY = height * props.value;
      setIsAnimating(true);
      setTimeout(() => {
        setTranslateY(newTranslateY);
      });
    }
  }, [props.value, height, animation]);

  const handleTransitionEnd = useMemoizedFn(() => {
    setIsAnimating(false);
  });

  return (
    <View className='heathen-digit-number-scroll'>
      {showAnimateList ? (
        <View
          className='heathen-digit-number-scroll-list'
          style={{
            transform: `translateY(-${translateY}px)`,
            transitionProperty: `transform`,
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction: animationEasing,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {NUMBER_LIST.map((num) => {
            return (
              <View className='heathen-digit-number-scroll-item' id={`${idPrefix}-${num}`} key={num}>
                {num}
              </View>
            );
          })}
        </View>
      ) : (
        <View className='heathen-digit-number-scroll-item'>{props.value}</View>
      )}
    </View>
  );
};
