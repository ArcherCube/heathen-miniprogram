import { mergeProps } from '@heathen/utils';

export type UseCascaderConfig<T extends Record<string, any> = Record<string, any>> = {
  options: T[];
  getFields?: (options: T) => {
    label: React.ReactNode;
    value: any;
    children: T[];
  };
  value: any[];
  depth?: number;
};

const defaultConfig: Required<Pick<UseCascaderConfig, 'getFields' | 'depth'>> = {
  getFields: (option) => ({
    label: option.label,
    value: option.value,
    children: option.children,
  }),
  depth: 3,
};

export const useCascader = <T extends Record<string, any>>(c: UseCascaderConfig<T>) => {
  const config = mergeProps(defaultConfig, c);
  const { options, getFields, value, depth } = config;

  const result = [];

  let currentColumn: T[] | undefined = options;
  for (let A = 0; A < depth && currentColumn; ++A) {
    result.push(
      currentColumn.map((option) => {
        const fields = getFields(option);
        return {
          label: fields.label,
          value: fields.value,
        };
      }),
    );
    const currentOption: T =
      currentColumn.find((option) => {
        const fields = getFields(option);
        return fields.value === value[A];
      }) ?? currentColumn[0];

    currentColumn = currentOption ? getFields(currentOption).children : undefined;
  }

  return {
    columns: result,
  };
};
