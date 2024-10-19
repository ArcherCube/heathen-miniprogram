import { mergeProps } from '@heathen/utils';
import { useContext } from 'react';
import { ConfigContext, ConfigContextType, defaultConfig } from './context';

export type ConfigProviderProps = {
  config?: Partial<ConfigContextType>;
};

export const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = (props) => {
  const config = mergeProps(defaultConfig, props.config);

  return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const config = useContext(ConfigContext);

  return config;
};
