import { Theme } from '../../type';
import { generateFormStyle } from './form';

export const generateComponentsStyle = (theme: Theme) => {
  const formStyle = generateFormStyle(theme);

  return {
    ...formStyle,
  };
};
