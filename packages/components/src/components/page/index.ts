import { attachPropertiesToComponent } from '@heathen/utils';
import { appendComponentToPage } from './additional-element';
import { usePageMount, usePageUnmount } from './event';
import { withPage } from './with-page';

export const Page = attachPropertiesToComponent(withPage, {
  appendComponent: appendComponentToPage,
  useMount: usePageMount,
  useUnmount: usePageUnmount,
});
