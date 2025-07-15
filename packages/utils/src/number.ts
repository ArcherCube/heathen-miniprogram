/**
 * 格式化数字位
 * @param money {number} 金额
 * @param fixed {number} 保留的小数位数
 * @returns {string}
 */
export const formatNumber = (origin: string | number | undefined, fixed: number = 2, separator: string = ',') => {
  if (!origin) return '0';
  const numberStr = (typeof origin === 'string' ? parseFloat(origin) : (origin ?? 0)).toFixed(fixed);
  return numberStr.replace(/\B(?=(?<!\..*)(\d{3})+(?!\d))/g, separator);
};

const ABBREVIATE_UNIT = [
  {
    label: '万',
    size: Math.pow(10, 4),
  },
  {
    label: '亿',
    size: Math.pow(10, 8),
  },
];

/**
 * 将数字进行简写，返回简写后的数值及其单位
 * @param origin 原数值
 * @returns [简写后的数值，简写后数值的单位]
 */
export const abbreviateNumber = (origin: string | number | undefined) => {
  if (!origin) return [0, ''] as const;
  const number = typeof origin === 'string' ? parseFloat(origin) : (origin ?? 0);

  const unitList: string[] = [];
  let currentNum = number;
  for (let A = ABBREVIATE_UNIT.length - 1; A >= 0; --A) {
    const currentUnit = ABBREVIATE_UNIT[A];
    if (currentNum >= currentUnit.size) {
      currentNum = currentNum / currentUnit.size;
      unitList.push(currentUnit.label);
    }
  }

  return [currentNum, unitList.reverse().join('')] as const;
};
