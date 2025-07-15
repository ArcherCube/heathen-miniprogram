import { PropsValueOptions, usePropsValue } from '@heathen/hooks';
import { AddImageOutlined, CrossCircleOutlined, CrossOutlined, LoadingOutlined } from '@heathen/icons';
import { generateUUID, mergeProps, NativeProps, withNativeProps } from '@heathen/utils';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { useConfig } from '../config-provider';
import { Image } from '../image';

export type UploadStatus = 'uploading' | 'completed' | 'failed';

export type UploadStatusConfig = Record<Exclude<UploadStatus, 'completed'>, { label: string; icon: React.ReactNode }>;

export type UploadFile = {
  url: string;
  key: string;
  type?: string;
  status?: UploadStatus;
};

export type ImageUploadProps = {
  /** 选择图片时的参数，同Taro.chooseImage */
  options?: Taro.chooseMedia.Option;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可以删除图片 */
  removable?: boolean;
  /** 最大可选数量 */
  maxFiles?: number;
  /** 是否多选（部分安卓机不兼容） */
  multiple?: boolean;
  /** 上传状态的配置 */
  statusConfig?: UploadStatusConfig;
  /** children */
  children?: ((trigger: () => void) => React.ReactNode) | React.ReactNode;
} & Partial<PropsValueOptions<UploadFile[]>> &
  NativeProps;

const defaultProps: Required<
  Pick<ImageUploadProps, 'defaultValue' | 'removable' | 'maxFiles' | 'multiple' | 'statusConfig' | 'children'>
> = {
  defaultValue: [],
  removable: true,
  multiple: true,
  maxFiles: 9,
  statusConfig: {
    uploading: {
      label: '加载中...',
      icon: <LoadingOutlined className='heathen-image-upload-item-status-loading' style={{ color: '#fff' }} />,
    },
    failed: { label: '上传失败', icon: <CrossCircleOutlined style={{ color: '#fff' }} /> },
  },
  children: (trigger) => {
    return (
      <View className='heathen-image-upload-button' onClick={trigger}>
        <AddImageOutlined />
        <View className='heathen-image-upload-button-text'>上传图片</View>
      </View>
    );
  },
};

export const ImageUpload: React.FC<ImageUploadProps> = (p) => {
  const props = mergeProps(defaultProps, p, { statusConfig: mergeProps(defaultProps.statusConfig, p.statusConfig) });
  const [value, setValue] = usePropsValue(props);
  const {
    ImageUpload: { doUpload },
  } = useConfig();

  const upload = useMemoizedFn((file: UploadFile) => {
    doUpload(file)
      .then((result) => {
        setValue((currentValue) => {
          const targetValue = currentValue.find((item) => item.key === file.key);
          if (targetValue) {
            targetValue.status = 'completed';
            targetValue.url = result;
          }
          return [...currentValue];
        });
      })
      .catch((e) => {
        setValue((currentValue) => {
          const targetValue = currentValue.find((item) => item.key === file.key);
          if (targetValue) {
            targetValue.status = 'failed';
          }
          return [...currentValue];
        });
        throw e;
      });
  });

  const onChooseImage = useMemoizedFn(() => {
    Taro.chooseMedia({
      count: props.multiple ? props.maxFiles - value.length : 1,
      mediaType: ['image'],
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      ...props.options,
    }).then(({ tempFiles }) => {
      const targetFiles = tempFiles.map((tempFile) => {
        return {
          type: tempFile.fileType,
          url: tempFile.tempFilePath,
          key: `${tempFile.tempFilePath}-${generateUUID()}`,
          status: 'uploading',
        } satisfies UploadFile;
      });
      setValue((currentValue) => {
        return [...currentValue, ...targetFiles];
      });
      targetFiles.forEach((file) => {
        upload(file);
      });
    });
  });

  const handleRemove = useMemoizedFn((file: UploadFile) => {
    setValue((currentValue) => {
      return currentValue.filter((item) => item.key !== file.key);
    });
  });

  const children = typeof props.children === 'function' ? props.children(onChooseImage) : props.children;
  return withNativeProps(
    props,
    <View className='heathen-image-upload'>
      {value.map((file) => {
        const statusFrame = file.status && file.status !== 'completed' ? props.statusConfig[file.status] : null;
        return (
          <View key={file.key} className='heathen-image-upload-item'>
            <Image src={file.url} className='heathen-image-upload-item-image' />
            {statusFrame ? (
              <View className='heathen-image-upload-item-status'>
                {statusFrame.icon}
                {statusFrame.label}
              </View>
            ) : null}
            {props.removable ? (
              <View className='heathen-image-upload-item-delete-button' onClick={() => handleRemove(file)}>
                <CrossOutlined />
              </View>
            ) : null}
          </View>
        );
      })}
      {children}
    </View>,
  );
};
