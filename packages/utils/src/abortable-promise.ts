export const createAbortablePromise = <T = any>(
  promise: Promise<T>,
): Promise<T> & { abort: (reason?: any) => void } => {
  let abort: () => void = () => console.warn('[createAbortablePromise]: abortPromise not register.');
  const abortPromise = new Promise<T>((_, reject) => (abort = reject));
  return Object.assign(Promise.race([promise, abortPromise]), { abort });
};
