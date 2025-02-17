import dayjs from 'dayjs';
import { DatePickerFilter, DateTimeField, RenderLabel } from './type';
import { convertArrayToDate } from './utils';

type GenerateDateTimeColumnsParams = {
  selected: number[];
  fields: DateTimeField[];
  min: Date;
  max: Date;
  renderLabel?: RenderLabel;
  filter?: DatePickerFilter;
};

export const generateDateTimeColumns = (params: GenerateDateTimeColumnsParams) => {
  const { selected, min, max, renderLabel, filter, fields } = params;
  const fieldsIndex = {
    year: fields.indexOf('year'),
    month: fields.indexOf('month'),
    day: fields.indexOf('day'),
    hour: fields.indexOf('hour'),
    minute: fields.indexOf('minute'),
    second: fields.indexOf('second'),
  };

  const generateColumn = (from: number, to: number, field: DateTimeField) => {
    let column: number[] = [];
    for (let A = from; A <= to; ++A) {
      column.push(A);
    }

    const prefix: number[] = [];
    const fieldsIndexEntries = Object.entries(fieldsIndex);
    for (let A = 0; A < fieldsIndexEntries.length; ++A) {
      const [currentField, currentIndex] = fieldsIndexEntries[A];
      if (currentField === field) {
        break;
      }
      prefix.push(selected[currentIndex]);
    }

    const currentFilter = filter?.[field];
    if (currentFilter && typeof currentFilter === 'function') {
      column = column.filter((A) => {
        const dateReader = {
          get date() {
            const stringArray = [...prefix, A];
            return convertArrayToDate(stringArray);
          },
        };
        return currentFilter(A, dateReader);
      });
    }
    return column;
  };

  const minYear = min.getFullYear();
  const minMonth = min.getMonth() + 1;
  const minDay = min.getDate();
  const minHour = min.getHours();
  const minMinute = min.getMinutes();
  const minSecond = min.getSeconds();

  const maxYear = max.getFullYear();
  const maxMonth = max.getMonth() + 1;
  const maxDay = max.getDate();
  const maxHour = max.getHours();
  const maxMinute = max.getMinutes();
  const maxSecond = max.getSeconds();

  const selectedYear = selected[fieldsIndex.year];
  const selectedMonth = selected[fieldsIndex.month];
  const selectedDay = selected[fieldsIndex.day];
  const selectedHour = selected[fieldsIndex.hour];
  const selectedMinute = selected[fieldsIndex.minute];
  const firstDayInSelectedMonth = dayjs(convertArrayToDate([selectedYear, selectedMonth, 1]));

  const isInMinYear = selectedYear === minYear;
  const isInMaxYear = selectedYear === maxYear;
  const isInMinMonth = isInMinYear && selectedMonth === minMonth;
  const isInMaxMonth = isInMaxYear && selectedMonth === maxMonth;
  const isInMinDay = isInMinMonth && selectedDay === minDay;
  const isInMaxDay = isInMaxMonth && selectedDay === maxDay;
  const isInMinHour = isInMinDay && selectedHour === minHour;
  const isInMaxHour = isInMaxDay && selectedHour === maxHour;
  const isInMinMinute = isInMinHour && selectedMinute === minMinute;
  const isInMaxMinute = isInMaxHour && selectedMinute === maxMinute;

  const result = fields.map((field) => {
    if (field === 'year') {
      const lower = minYear;
      const upper = maxYear;
      const years = generateColumn(lower, upper, 'year');
      return years.map((v) => ({
        label: renderLabel?.('year', v) ?? v,
        value: v,
      }));
    }
    if (field === 'month') {
      const lower = isInMinYear ? minMonth : 1;
      const upper = isInMaxYear ? maxMonth : 12;
      const months = generateColumn(lower, upper, 'month');
      return months.map((v) => ({
        label: renderLabel?.('month', v) ?? v,
        value: v,
      }));
    }
    if (field === 'day') {
      const lower = isInMinMonth ? minDay : 1;
      const upper = isInMaxMonth ? maxDay : firstDayInSelectedMonth.daysInMonth();
      const days = generateColumn(lower, upper, 'day');
      return days.map((v) => ({
        label: renderLabel?.('day', v) ?? v,
        value: v,
      }));
    }
    if (field === 'hour') {
      const lower = isInMinDay ? minHour : 0;
      const upper = isInMaxDay ? maxHour : 23;
      const hours = generateColumn(lower, upper, 'hour');
      return hours.map((v) => ({
        label: renderLabel?.('hour', v) ?? v,
        value: v,
      }));
    }
    if (field === 'minute') {
      const lower = isInMinHour ? minMinute : 0;
      const upper = isInMaxHour ? maxMinute : 59;
      const minutes = generateColumn(lower, upper, 'minute');
      return minutes.map((v) => ({
        label: renderLabel?.('minute', v) ?? v,
        value: v,
      }));
    }
    if (field === 'second') {
      const lower = isInMinMinute ? minSecond : 0;
      const upper = isInMaxMinute ? maxSecond : 59;
      const seconds = generateColumn(lower, upper, 'second');
      return seconds.map((v) => ({
        label: renderLabel?.('second', v) ?? v,
        value: v,
      }));
    }

    // 理论上不会走到这里
    return [];
  });

  return result;
};
