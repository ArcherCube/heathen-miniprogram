import { mergeProps } from '@heathen/utils';
import { Page } from '../page';
import { CapsuleMessage, CapsuleMessageProps } from './capsule-message';

// CapsuleMessage为单例
const capsuleMessageHandler: { current: ReturnType<typeof Page.appendComponent<typeof CapsuleMessage>> | undefined } = {
  current: undefined,
};
const capsuleMessageTimer: { current: NodeJS.Timeout | undefined } = { current: undefined };

export type DynamicIslandMethodOption = Omit<CapsuleMessageProps, 'visible' | 'rootPortal'> & {
  /**
   * 消息的持续时间，默认按传入的 message 的长度自动计算，传入的 message 不为字符串时，默认为2秒。
   * - 设置后如果内容开始滚动，则设置无效
   * - 如果消息长度不确定，需要考虑从弹出到开始滚动会经过大约 1.3 秒左右的时间，此时建议设置的 duration 在 1.5 以上以保证及时内容发生滚动也不会因为 duration 而自动关闭
   */
  duration?: number;
  /**
   * 是否在消息滚动完毕后自动关闭，默认true
   * - 设置后如果内容开始滚动，则duration无效
   * - 要注意不是所有消息都会滚动
   **/
  closeOnMessageScrollEnd?: boolean;
};

const defaultOption: Required<Pick<DynamicIslandMethodOption, 'duration' | 'closeOnMessageScrollEnd'>> = {
  duration: 2000,
  closeOnMessageScrollEnd: true,
};

export const show = (o: DynamicIslandMethodOption | string) => {
  capsuleMessageHandler.current?.destroy();
  clearTimeout(capsuleMessageTimer.current);

  const inputOption = typeof o === 'string' ? ({ message: o } satisfies DynamicIslandMethodOption) : o;
  const option = mergeProps(defaultOption, inputOption, {
    duration:
      inputOption.duration ??
      (typeof inputOption.message === 'string'
        ? Math.max(inputOption.message.length * 300, defaultOption.duration)
        : defaultOption.duration),
  });

  const closeTimer = setTimeout(() => {
    handler?.update({
      visible: false,
    });
  }, option.duration);

  const handler = Page.appendComponent(CapsuleMessage, {
    ...option,
    visible: true,
    onMessageScrollStart: () => {
      clearTimeout(closeTimer);
    },
    onMessageScrollEnd: () => {
      handler?.update({
        visible: false,
      });
      clearTimeout(closeTimer);
    },
    onClose: () => {
      handler?.update({
        visible: false,
      });
      clearTimeout(closeTimer);
      option.onClose?.();
    },
    afterClose: () => {
      handler?.destroy();
      option.afterClose?.();
    },
    rootPortal: {
      enable: false,
    },
  });

  capsuleMessageHandler.current = handler;
  capsuleMessageTimer.current = closeTimer;
};
