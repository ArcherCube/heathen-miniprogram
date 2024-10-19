/** TODO:
 * 1、Taroify 需要本地化，目前暂时直接导出需要用到的组件和样式（样式变成自动引入后要注意与主应用tailwind优先级的问题）
 * 2、@heathen/components的样式如果用到了@heathen/design-token，应该单独配置tailwind或者用css变量来导入，而不是直接`@apply`
 */

import '@taroify/core/button/style';
import '@taroify/core/input/style';
import '@taroify/core/checkbox/style';
import '@taroify/core/textarea/style';
import '@taroify/core/cell/style';
import '@taroify/core/uploader/style';
import '@taroify/core/safe-area/style';
import '@taroify/core/toast/style';
import '@taroify/core/dialog/style';
import '@taroify/core/list/style';
import '@taroify/core/search/style';
import '@taroify/core/swiper/style';
import '@taroify/core/tabs/style';
import '@taroify/core/pull-refresh/style';
import '@taroify/core/slider/style';
import '@taroify/core/popup/style';
import './taroify.css';

export {
  Button,
  Input,
  Checkbox,
  Textarea,
  Cell,
  Uploader,
  SafeArea,
  Toast,
  Dialog,
  List,
  Search,
  Swiper,
  Tabs,
  PullRefresh,
  Slider,
  Popup,
} from '@taroify/core';

/** ConfigProvider */
export { ConfigProvider, useConfig } from './src/components/config-provider';
export type { ConfigProviderProps } from './src/components/config-provider';

/** NavigationBar */
export { NavigationBar } from './src/components/navigation-bar';
export type { NavigationBarProps } from './src/components/navigation-bar';

/** Image */
export { Image } from './src/components/image';
export type { ImageProps } from './src/components/image';

/** Form */
export { Form } from './src/components/form';
export type {
  FormProps,
  FieldData,
  NamePath,
  Rule,
  RuleObject,
  RuleRender,
  ValidateMessages,
  FormLayout,
  FormInstance,
  FormItemProps,
  FormSubscribeProps,
} from './src/components/form';
