export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = {
    leading: true,
    trailing: true,
  },
): (...args: Parameters<T>) => void {
  let lastCallTime: number | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();

    const invoke = () => {
      lastCallTime = Date.now();
      func(...(lastArgs as Parameters<T>));
      timeout = null;
      lastArgs = null;
    };

    const shouldCallNow = lastCallTime === null || now - lastCallTime >= limit;

    if (shouldCallNow) {
      if (options.leading !== false) {
        lastCallTime = now;
        func(...args);
      }
    } else if (options.trailing !== false) {
      lastArgs = args;
      if (!timeout) {
        const remaining = limit - (now - (lastCallTime ?? 0));
        timeout = setTimeout(invoke, remaining);
      }
    }
  };
}
