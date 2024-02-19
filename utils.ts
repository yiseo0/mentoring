type KeyValue<T> = [keyof T, T[keyof T]]; // helper type

/** 깊은 복사를 실행하는 함수 */
export const cloneDeep = <T>(target: T): T => {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((item) => cloneDeep(item)) as T;
  }

  const entries = Object.entries(target) as KeyValue<T>[];
  const copy = entries.reduce((acc: Partial<T>, [key, value]) => {
    acc[key] = cloneDeep(value);
    return acc;
  }, {});
  return copy as T;
};

/**memoize 함수 */
export const memoize = (func: Function) => {
  const results = {};

  return (...args: any[]) => {
    const argsKey = JSON.stringify(args);
    if (results[argsKey]) {
      return results[argsKey];
    } else {
      results[argsKey] = func(...args);
      return results[argsKey];
    }
  };
};
