import { UnitType } from 'dayjs';

export type DateTimeField = Extract<UnitType, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'>;

export type DatePickerFilter = Partial<
  Record<
    DateTimeField,
    (
      value: number,
      extend: {
        date: Date;
      },
    ) => boolean
  >
>;

export type RenderLabel = (type: DateTimeField, data: number) => React.ReactNode;
