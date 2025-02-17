export type PickerOptionValue = string | number | undefined;

export type PickerOption = {
  label: React.ReactNode;
  value: PickerOptionValue;
};

export type PickerColumn = Array<PickerOption>;
