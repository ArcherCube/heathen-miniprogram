import { mergeProps } from '@heathen/utils';
import { Page } from '../page';
import { DynamicIsland, DynamicIslandProps } from './dynamic-island';

// DynamicIsland为单例
const dynamicIslandHandler: { current: ReturnType<typeof Page.appendComponent<typeof DynamicIsland>> | undefined } = {
  current: undefined,
};
const dynamicIslandTimer: { current: NodeJS.Timeout | undefined } = { current: undefined };

export type DynamicIslandMethodOption = Omit<DynamicIslandProps, 'visible' | 'rootPortal'> & {
  duration?: number;
};

const defaultOption: Required<Pick<DynamicIslandMethodOption, 'duration'>> = {
  duration: 2000,
};

export const show = (o: DynamicIslandMethodOption | string) => {
  dynamicIslandHandler.current?.destroy();
  clearTimeout(dynamicIslandTimer.current);

  const option = mergeProps(
    defaultOption,
    typeof o === 'string' ? ({ children: o } satisfies DynamicIslandMethodOption) : o,
  );

  const closeTimer = setTimeout(() => {
    handler?.update({
      visible: false,
    });
  }, option.duration);

  const handler = Page.appendComponent(DynamicIsland, {
    ...option,
    visible: true,
    onClose: () => {
      handler?.update({
        visible: false,
      });
      clearTimeout(closeTimer);
    },
    afterClose: () => {
      handler?.destroy();
      option.afterClose?.();
    },
    rootPortal: {
      enable: false,
    },
  });

  dynamicIslandHandler.current = handler;
  dynamicIslandTimer.current = closeTimer;
};
