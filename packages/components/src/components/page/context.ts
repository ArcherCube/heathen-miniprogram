import { TaroElement } from '@tarojs/runtime';
import React, { RefObject } from 'react';

export type PageContextType = {
  rootElementRef?: RefObject<TaroElement>;
};

export const PageContext = React.createContext<PageContextType>({});
