import { mergeProps } from '@heathen/utils';
import useCreation from 'ahooks/es/useCreation';
import { ConfigContext, ConfigContextType, defaultConfig } from './context';

export type ConfigProviderProps = {
  config?: Partial<ConfigContextType>;
};

export const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = (props) => {
  const config = useCreation(() => {
    const keys = [...Object.keys(defaultConfig), ...Object.keys(props)] as Array<keyof ConfigContextType>;
    let result: ConfigContextType = defaultConfig;
    for (const key of keys) {
      Object.assign(result, { [key]: mergeProps(defaultConfig[key], props.config?.[key]) });
    }

    return result;
  }, [props]);

  return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};
