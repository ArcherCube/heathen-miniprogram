import { Router } from '@heathen/router';

export default defineAppConfig({
  ...Router.getAppConfig(),
  window: {
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {},
});
