import { MAIN_PAGES } from '@/constants/pages';

export default defineAppConfig({
  pages: Object.values(MAIN_PAGES).map((page) => page.replace('/', '')),
  window: {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {},
});
