/**
 * @doctests
 * ```js
 * t.is(sum(1, 2), 3)
 * t.is(sum(4, 4), 8)
 * ```
 */
export const sum = (a: number, b: number): number => {
  return a + b;
};

/**
 * concats two strings
 *
 * @doctest
 * ```js
 *  t.is(concat("a", "b"), "ab")
 * ```
 *
 */
export const concat = (a: string, b: string): string => {
  return a + b;
};

/**
 * is it a non-empty string?
 *
 * @doctest
 * ```js
 * t.true(isPresent("x"))
 * t.false(isPresent(' '))
 * t.false(isPresent(undefined))
 * t.false(isPresent(null))
 * ```
 */
export const isPresent = function (str?: string | null): boolean {
  if (str == null) {
    return false;
  }

  return typeof str === "string" && str.trim() !== "";
};

/**
 *
 * mutably concats arr2 to arr1
 *
 * @doctest
 * ```js
 * const arr1 = [1,2];
 * const arr2 = [3,4];
 * mutatingConcat(arr1, arr2)
 *
 * t.deepEqual(arr1, [1,2,3,4])
 * ```
 */
export const mutatingConcat = <T>(arr1: T[], arr2: T[]): void => {
  arr1.push(...arr2);
};

/**
 * Grab differences btwn two objects; assumes they have the same keys due to TS
 *
 * @doctest
 * ```js
 * const diff = getDiff({a: 1, b: 1, c: 9}, {a: 1, b: 2});
 * t.deepEqual(diff, {b: 2})
 * ```
 */
export const getDiff = <T>(existing: T, nextObj: T): Partial<T> => {
  const diff: Partial<T> = {};

  for (const attr in nextObj) {
    if (existing[attr] !== nextObj[attr]) {
      diff[attr] = nextObj[attr];
    }
  }

  return diff;
};

/**
 * transform a value
 *
 * @doctest
 * ```js
 * const result = pipe(1, (n) => n + 1)
 * t.is(result, 2)
 * ```
 */
export const pipe = <A, B>(a: A, ab: (a: A) => B): B => ab(a);

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
