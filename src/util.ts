/**
 * gets function name
 *
 * @doctest
 * ```js
 * let fn = "export const isFn = () => true";
 * t.is(getFunctionName(fn), "isFn");
 * fn = "export function isFn() { return true }";
 * t.is(getFunctionName(fn), "isFn");
 * fn = "export function isFn () { return true }";
 * t.is(getFunctionName(fn), "isFn");
 * fn = "export function isFn<T>(a: T) { return true }";
 * t.is(getFunctionName(fn), "isFn");
 * ```
 */
export function getFunctionName(line: string): string {
  let fn = line.split(" ")[2];
  if (fn == null) {
    throw new Error(`function name couldnt be found for: ${line}`);
  }

  if (/function/.test(line)) {
    if (/\</.test(fn)) {
      fn = fn.split("<")[0]!;
    } else if (/\(/.test(fn)) {
      fn = fn.split("(")[0]!;
    }
  }

  return fn;
}

/**
 * access an array, allows negative numbers
 *
 * @doctest
 * ```js
 * t.is(arrAt([1,2,3,4], -1), 4)
 * t.is(arrAt([1,2,3,4], -2), 3)
 * t.is(arrAt([1,2,3,4], 0), 1)
 * ```
 */
export const arrAt = <T>(arr: T[], index: number): T | undefined => {
  if (index >= 0) {
    return arr[index];
  } else {
    return arr[arr.length + index];
  }
};

/**
 * transform a value via callback
 *
 * @doctest
 * ```js
 * t.is(then(1, (n) => n + 1), 2)
 * ```
 */
export const then = <A, B>(a: A, cb: (a: A) => B): B => {
  return cb(a);
};

/**
 * insert into array at specified index
 *
 * @doctest
 * ```js
 * t.is(then(1, (n) => n + 1), 2)
 * ```
 */
export const insertAt = <T>(arr: T[], index: number, item: T): void => {
  arr.splice(index, 0, item);
};

/**
 * remove null/undefined from an array
 *
 * @doctest
 * ```js
 * const arr = [1, undefined, 2, null, 3]
 * t.deepEqual(compact(arr), [1,2,3])
 * ```
 */
export const myCompact = <T>(arr: Array<T | null | undefined>): Array<T> => {
  const nextArr = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (element != null) {
      nextArr.push(element);
    }
  }

  return nextArr;
};
