/**
 * @doctests
 * ```js
 * t.is(sum(1, 2), 3)
 * t.is(sum(4, 4), 8)
 * ```
 */
export const sum = (a, b) => {
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
export const concat = (a, b) => {
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
export const isPresent = function (str) {
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
export const mutatingConcat = (arr1, arr2) => {
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
export const getDiff = (existing, nextObj) => {
    const diff = {};
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
export const pipe = (a, ab) => ab(a);
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
export const arrAt = (arr, index) => {
    if (index >= 0) {
        return arr[index];
    }
    else {
        return arr[arr.length + index];
    }
};
/**
 * shallow equal comparison
 *
 * @doctest
 * ```js
 * t.true(shallowEqual({a: 1}, {a: 1}))
 * t.false(shallowEqual({a: 2}, {a: 1}))
 * t.false(shallowEqual({a: 1, b: 2}, {a: 1}))
 * ```
 */
export function shallowEqual(a, b) {
    const keys1 = Object.keys(a);
    const keys2 = Object.keys(b);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
/**
 * check if matches `{ errors: [] }` format
 *
 * @doctest
 * ```js
 * t.true(isErrorResponse({errors: ['asdf']}))
 * t.false(isErrorResponse({error: ['asdf']}))
 * t.false(isErrorResponse(null))
 * ```
 */
export function isErrorResponse(json) {
    return json != null && json.errors !== undefined;
}
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
export function getFunctionName(line) {
    let fn = line.split(" ")[2];
    if (fn == null) {
        throw new Error(`function name couldnt be found for: ${line}`);
    }
    if (/function/.test(line)) {
        if (/\</.test(fn)) {
            fn = fn.split("<")[0];
        }
        else if (/\(/.test(fn)) {
            fn = fn.split("(")[0];
        }
    }
    return fn;
}
//# sourceMappingURL=easyTest.js.map