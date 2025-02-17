import React, { SetStateAction } from 'react';

export type CheckboxGroupContextType = {
  value: any[];
  disabled: boolean;
  readonly: boolean;
  setValue: (v: SetStateAction<any[]>) => void;
  __active: boolean;
};

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextType>({
  value: [],
  disabled: false,
  readonly: false,
  setValue: (current) => {
    console.warn('[CheckboxGroup]: do not use context outside a Provider.');
    return current;
  },
  __active: false,
});
