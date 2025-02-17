import { Theme } from '../../type';

export const generateFormStyle = (theme: Theme) => {
  return {
    '--form-control-disabled-opacity': theme.components.form.disabledOpacity,
  };
};
