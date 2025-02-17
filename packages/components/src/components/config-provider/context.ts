import React from 'react';
import { UploadFile } from '../image-upload/image-upload';

export type ConfigContextType = {
  Image: {
    /** 图片组件的路径前缀，一般为oss地址 */
    imageSrcPrefix: string;
    /** oss的类型，主要用于使用oss的图片处理能力 */
    ossType?: typeof process.env.TARO_APP_OSS_TYPE;
  };
  ImageUpload: {
    /** 描述图片上传的动作 */
    doUpload: (files: UploadFile) => Promise<string>;
  };
  NavigationBar: {
    /** 描述“回到上一页”的动作 */
    goBack: () => void;
    /** 获取主页路径的方法。当当前不在主页中时，默认会展示主页按钮 */
    homePage: string;
  };
};

export const defaultConfig: ConfigContextType = {
  Image: {
    imageSrcPrefix: '',
  },
  ImageUpload: {
    doUpload: () => {
      const message = '[ConfigProvider]: you are not config the doUpload method.';
      console.warn(message);
      return Promise.reject(new Error(message));
    },
  },
  NavigationBar: {
    homePage: '',
    goBack: () => console.warn('[ConfigProvider]: you are not config the goBack method.'),
  },
};

export const ConfigContext = React.createContext<ConfigContextType>(defaultConfig);
