import { View } from '@tarojs/components';
import { TaroElement } from '@tarojs/runtime';
import { useMount } from 'ahooks';
import useCreation from 'ahooks/es/useCreation';
import isNil from 'lodash-es/isNil';
import { useRef, useState } from 'react';
import { formatNumber, getBoundingClientRect, mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { DigitContext, DigitContextType } from './context';
import { NumberScroll } from './number-scroll';

type DigitSectionType = 'number' | 'separator' | 'decimalSplit' | 'minusSign';

type DigitSection =
  | {
      value: number;
      type: Extract<DigitSectionType, 'number'>;
    }
  | {
      value: string;
      type: Exclude<DigitSectionType, 'number'>;
    };

export type DigitValue = string | number | null | undefined;

export type DigitProps = {
  value: DigitValue;
  children?: (origin: React.ReactNode) => React.ReactNode;
  separator?: string;
  decimals?: number;
} & Partial<Pick<DigitContextType, 'animationDuration' | 'animationEasing' | 'animation'>> &
  NativeProps;

const DECIMAL_SPLIT = '.';

const defaultProps: Required<
  Pick<DigitProps, 'separator' | 'decimals' | 'animation' | 'animationEasing' | 'animationDuration'>
> = {
  separator: ',',
  decimals: 2,
  animation: false,
  animationDuration: 500,
  animationEasing: 'cubic-bezier(0.32, 0.72, 0, 1)',
};

export const Digit: React.FC<DigitProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const digitRef = useRef<TaroElement>(null);
  const [height, setHeight] = useState<number>(0);

  const digitSections = useCreation<DigitSection[]>(() => {
    const numberStr = String(props.value ?? 0);
    const formatedStr = formatNumber(numberStr, props.decimals, props.separator);
    return formatedStr.split('').map((char) => {
      if (char === DECIMAL_SPLIT) {
        return {
          value: char,
          type: 'decimalSplit',
        };
      } else if (char === props.separator) {
        return {
          value: char,
          type: 'separator',
        };
      } else if (char === '-') {
        return {
          value: char,
          type: 'minusSign',
        };
      } else {
        return {
          value: Number(char),
          type: 'number',
        };
      }
    });
  }, [props.value, props.decimals, props.separator]);

  useMount(() => {
    getBoundingClientRect(digitRef).then((rect) => {
      setHeight(rect.height);
    });
  });

  return withNativeProps(
    props,
    <View className='heathen-digit' ref={digitRef}>
      <DigitContext.Provider
        value={{
          height,
          animationDuration: props.animationDuration,
          animationEasing: props.animationEasing,
          animation: props.animation,
        }}
      >
        {digitSections.map((item, index) => {
          if (!isNil(item.value)) {
            if (item.type === 'number') {
              return <NumberScroll key={index} value={item.value} />;
            }
            return (
              <View key={index} className='heathen-digit-char'>
                {item.value}
              </View>
            );
          }
          return null;
        })}
      </DigitContext.Provider>
    </View>,
  );
};
