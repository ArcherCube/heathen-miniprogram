import React from 'react';

export type DigitContextType = {
  height: number;
  animationDuration?: number;
  animationEasing?: string;
  animation?: boolean;
};

export const DigitContext = React.createContext<DigitContextType>({
  height: 0,
});
