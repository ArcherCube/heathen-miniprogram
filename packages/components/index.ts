/** 全局样式 */
import './src/style';

/** 导出taro原本的组件 */
export * from '@tarojs/components';

/** ConfigProvider */
export { ConfigProvider, useConfig } from './src/components/config-provider';
export type { ConfigProviderProps } from './src/components/config-provider';

/** Button */
export { Button } from './src/components/button';
export type { ButtonProps } from './src/components/button';

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

/** Layer */
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

/** Checkbox */
export { Checkbox } from './src/components/checkbox';
export type { CheckboxProps } from './src/components/checkbox';

/** ScrollText */
export { ScrollText } from './src/components/scroll-text';
export type { ScrollTextProps } from './src/components/scroll-text';

/** Cell */
export { Cell } from './src/components/cell';
export type { CellProps } from './src/components/cell';

/** Input */
export { Input } from './src/components/input';
export type { InputProps } from './src/components/input';

/** Textarea */
export { Textarea } from './src/components/textarea';
export type { TextareaProps } from './src/components/textarea';

/** Tabs */
export { Tabs } from './src/components/tabs';
export type { TabsProps } from './src/components/tabs';

/** Page */
export { Page } from './src/components/page';

/** Digit */
export { Digit } from './src/components/digit';
export type { DigitProps, DigitValue } from './src/components/digit';

/** ScrollView */
export { ScrollView } from './src/components/scroll-view';
export type { ScrollViewProps } from './src/components/scroll-view';

/** Badge */
export { Badge } from './src/components/badge';
export type { BadgeProps, BadgePosition } from './src/components/badge';

/** DynamicIsland */
export { DynamicIsland } from './src/components/dynamic-island';
export type { DynamicIslandProps } from './src/components/dynamic-island';

/** CapsuleMessage */
export { CapsuleMessage } from './src/components/capsule-message';
export type { CapsuleMessageProps } from './src/components/capsule-message';
