/** 等待指定时间后做动作，setTimeout的Promise版 */
export const wait = async (duration?: number) => {
  return await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration);
  });
};

/**
 * 格式化数字位
 * @param money {number} 金额
 * @param fixed {number} 保留的小数位数
 * @returns {string}
 */
export const formatNumber = (money: string | number | undefined, fixed: number = 2) => {
  if (!money) return '0';
  const numberStr = (typeof money === 'string' ? parseFloat(money) : (money ?? 0)).toFixed(fixed);
  return numberStr.replace(/\B(?=(?<!\..*)(\d{3})+(?!\d))/g, ',');
};
