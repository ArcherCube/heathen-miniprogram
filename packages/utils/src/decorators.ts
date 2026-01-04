export type CreateAccessorOptions<This = unknown, Value = unknown> = {
  getter?: (this: This, origin: Value) => Value;
  setter?: (this: This, newValue: Value) => Value;
};

export function createAccessor<This = unknown, Value = unknown>(options: CreateAccessorOptions<This, Value>) {
  return function (
    origin: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value> {
    const { kind } = context;

    if (kind !== 'accessor') {
      throw new Error('');
    }

    const { getter, setter } = options;

    return {
      get() {
        return getter ? getter.call(this, origin.get.call(this)) : origin.get.call(this);
      },
      set(v) {
        origin.set.call(this, setter ? setter.call(this, v) : v);
      },
    };
  };
}

export function watchEffect<This extends object = object, Value = unknown>(
  callback: (this: This, newValue: Value, oldValue: Value) => void,
) {
  return function (
    origin: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value> {
    const { kind } = context;

    if (kind !== 'accessor') {
      throw new Error('');
    }

    return createAccessor<This, Value>({
      setter(newValue) {
        const oldValue = origin.get.call(this);
        if (oldValue !== newValue) {
          callback.call(this, newValue, oldValue);
        }

        return newValue;
      },
    })(origin, context);
  };
}
