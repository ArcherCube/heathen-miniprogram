type EventMap = Record<string, Record<string, any>>;

/**
 * 提取EventMap内，回调中含有必填参数的事件名
 */
type ExtractRequiredEventName<T extends EventMap> = {
  [K in keyof T]: RequiredKeys<T[K]> extends never ? never : K;
}[keyof T];

export class EventBus<T extends EventMap> {
  private listeners: {
    [K in keyof T]?: Array<(payload: T[K]) => void>;
  } = {};

  public on<E extends keyof T>(eventName: E, callback: (payload: T[E]) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName]?.push(callback);
  }

  public off<E extends keyof T>(eventName: E, callback: (payload: T[E]) => void) {
    if (!this.listeners[eventName]) {
      return;
    }
    this.listeners[eventName] = this.listeners[eventName]?.filter((cb) => {
      return cb !== callback;
    });
  }
  public emit<E extends ExtractRequiredEventName<T>>(eventName: E, payload: T[E]): void;
  public emit<E extends Exclude<keyof T, ExtractRequiredEventName<T>>>(eventName: E, payload?: T[E]): void;
  public emit<E extends keyof T>(eventName: E, payload?: T[E]) {
    if (!this.listeners[eventName]?.length) {
      return;
    }

    const callbacks = this.listeners[eventName];
    for (let A = 0; A < callbacks.length; ++A) {
      callbacks[A]((payload ?? {}) as T[E]);
    }
  }
}
