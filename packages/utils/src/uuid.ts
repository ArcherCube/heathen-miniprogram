const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

/**
 * 生成uuid
 * @param length 长度
 */
export const generateUUID = (length: number = 32) => {
  const uuid: string[] = [];

  for (let A = 0; A < length; A++) {
    uuid[A] = chars[(Math.random() * chars.length) | 0];
  }

  return uuid.join('');
};
