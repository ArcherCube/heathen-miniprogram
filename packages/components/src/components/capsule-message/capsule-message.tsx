import { View } from '@tarojs/components';
import { useLayout } from '@heathen/hooks';
import { mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { useMemoizedFn } from 'ahooks';
import useCreation from 'ahooks/es/useCreation';
import React, { useState } from 'react';
import { DynamicIsland, DynamicIslandProps } from '../dynamic-island';
import { ScrollText } from '../scroll-text';

export type CapsuleMessageProps = {
  message?: React.ReactNode;
  onMessageScrollStart?: () => void;
  onMessageScrollEnd?: () => void;
} & Omit<DynamicIslandProps, 'children'> &
  NativeProps;

const defaultProps: Required<Pick<CapsuleMessageProps, 'message'>> = {
  message: '',
};

export const CapsuleMessage = (p: CapsuleMessageProps) => {
  const props = mergeProps(defaultProps, p);
  const {
    message,
    visible,
    afterClose,
    afterShow: originAfterShow,
    onClose,
    mask,
    closeOnMaskClick,
    rootPortal,
    ...nativeProps
  } = props;
  const capsuleRect = useLayout()?.menuRect;
  const [settled, setSettled] = useState<boolean>(false);

  const style = useCreation<React.CSSProperties>(() => {
    const capsuleWidth = capsuleRect?.width || 0;
    const capsuleHeight = capsuleRect?.height || 0;
    return {
      paddingRight: `${capsuleWidth + capsuleHeight / 2}px`,
      paddingLeft: `${capsuleHeight / 2}px`,
      height: `${capsuleHeight}px`,
    };
  }, [capsuleRect?.height, capsuleRect?.width]);

  const afterShow = useMemoizedFn(() => {
    setSettled(true);
    originAfterShow?.();
  });

  return (
    <DynamicIsland
      visible={visible}
      afterClose={afterClose}
      afterShow={afterShow}
      onClose={onClose}
      mask={mask}
      closeOnMaskClick={closeOnMaskClick}
      rootPortal={rootPortal}
    >
      {withNativeProps(
        nativeProps,
        <View className='heathen-capsule-message' style={style}>
          {settled ? (
            <ScrollText
              delay={0}
              infinite={false}
              onScrollStart={props.onMessageScrollStart}
              onScrollEnd={props.onMessageScrollEnd}
            >
              {message}
            </ScrollText>
          ) : (
            <View className='heathen-capsule-message-holder'>{message}</View>
          )}
        </View>,
      )}
    </DynamicIsland>
  );
};
