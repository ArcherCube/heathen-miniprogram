/** TODO:
 * 1、Taroify 需要本地化，目前暂时直接导出需要用到的组件和样式（样式变成自动引入后要注意与主应用tailwind优先级的问题）
 */

import '@taroify/core/cell/style';
import '@taroify/core/input/style';
import '@taroify/core/search/style';
import '@taroify/core/slider/style';
import '@taroify/core/tabs/style';
import '@taroify/core/textarea/style';
import '@taroify/core/swipe-cell/style';
import './taroify.css';

import './src/style';

export * from '@tarojs/components';

export { Cell, Input, Search, Slider, Tabs, Textarea, SwipeCell } from '@taroify/core';

/** ConfigProvider */
export { ConfigProvider, useConfig } from './src/components/config-provider';
export type { ConfigProviderProps } from './src/components/config-provider';

/** RootPortal */
export { RootPortal } from './src/components/root-portal';
export type { RootPortalProps } from './src/components/root-portal';

/** Button */
export { Button } from './src/components/button';
export type { ButtonProps } from './src/components/button';

/** Checkbox */
export { Checkbox } from './src/components/checkbox';
export type { CheckboxProps, CheckboxGroupProps } from './src/components/checkbox';

/** ImageUpload */
export { ImageUpload } from './src/components/image-upload';
export type { ImageUploadProps, UploadFile } from './src/components/image-upload';

/** NavigationBar */
export { NavigationBar } from './src/components/navigation-bar';
export type { NavigationBarProps } from './src/components/navigation-bar';

/** Image */
export { Image } from './src/components/image';
export type { ImageProps } from './src/components/image';

/** Form */
export { Form } from './src/components/form';
export type {
  FieldData,
  FormInstance,
  FormItemProps,
  FormLayout,
  FormProps,
  FormSubscribeProps,
  NamePath,
  Rule,
  RuleObject,
  RuleRender,
  ValidateMessages,
} from './src/components/form';

/** Picker */
export { Picker } from './src/components/picker';
export type {
  PickerColumn,
  PickerOption,
  PickerOptionValue,
  PickerProps,
  PickerViewProps,
} from './src/components/picker';

/** DatePicker */
export { DatePicker } from './src/components/date-picker';
export type { DatePickerProps, DatePickerViewProps, DateTimeField } from './src/components/date-picker';

/** TabBar */
export { TabBar } from './src/components/tab-bar';
export type { TabBarProps, TabBarItem } from './src/components/tab-bar';

export { Layer } from './src/components/layer';
export type { LayerProps } from './src/components/layer';

/** Toast */
export { Toast } from './src/components/toast';
export type { ToastProps, ToastMethodOption } from './src/components/toast';

/** Modal */
export { Modal } from './src/components/modal';
export type { ModalProps, ModalMethodOption } from './src/components/modal';

/** RichText */
export { RichText } from './src/components/rich-text';
export type { RichTextProps } from './src/components/rich-text';

/** Collapse */
export { Collapse } from './src/components/collapse';
export type { CollapseProps } from './src/components/collapse';

/** Popup */
export { Popup } from './src/components/popup';
export type { PopupProps } from './src/components/popup';

/** UnsafeArea */
export { UnsafeArea } from './src/components/unsafe-area';
export type { UnsafeAreaProps } from './src/components/unsafe-area';

/** TabBarPage */
export { TabBarPage } from './src/components/tab-bar-page';
export type { TabBarPageProps } from './src/components/tab-bar-page';

/** Skeleton */
export { Skeleton } from './src/components/skeleton';
export type { SkeletonProps } from './src/components/skeleton';

/** ScrollText */
export { ScrollText } from './src/components/scroll-text';
export type { ScrollTextProps } from './src/components/scroll-text';
