import { useContext } from 'react';
import { PageContext } from './context';

export const usePage = () => {
  const config = useContext(PageContext);

  return config;
};
