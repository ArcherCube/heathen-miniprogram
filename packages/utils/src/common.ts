/** 等待指定时间后做动作，setTimeout的Promise版 */
export const wait = async (duration?: number) => {
  return await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration);
  });
};
