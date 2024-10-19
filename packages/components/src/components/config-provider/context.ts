import React from 'react';

export type ConfigContextType = {
  imageSrcPrefix: string;
};

export const defaultConfig: ConfigContextType = {
  imageSrcPrefix: '',
};

export const ConfigContext = React.createContext<ConfigContextType>(defaultConfig);
