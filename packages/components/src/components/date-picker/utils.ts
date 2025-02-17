export const convertDateToArray = (date: Date | undefined | null) => {
  if (!date) return [];
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export const convertArrayToDate = (value: number[]) => {
  const yearString = value[0] ?? 1900;
  const monthString = value[1] ?? 1;
  const dateString = value[2] ?? 1;
  const hourString = value[3] ?? 0;
  const minuteString = value[4] ?? 0;
  const secondString = value[5] ?? 0;
  return new Date(yearString, monthString - 1, dateString, hourString, minuteString, secondString);
};
