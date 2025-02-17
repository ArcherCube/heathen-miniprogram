import { mergeProps } from '@heathen/utils';
import { ConfigContext, ConfigContextType, defaultConfig } from './context';

export type ConfigProviderProps = {
  config?: Partial<ConfigContextType>;
};

export const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = (props) => {
  const config = mergeProps(defaultConfig, props.config);

  return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};
