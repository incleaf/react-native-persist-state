export function isFunction<T>(
  param: T | ((prevState: T) => T)
): param is (prevState: T) => T {
  return typeof param === "function";
}
