export function isFunction(
  value: unknown,
): value is (...args: any[]) => unknown {
  return typeof value === 'function';
}
