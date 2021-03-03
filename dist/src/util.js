/**
 * gets function name
 *
 * @doctest
 * ```js
 * const fn = "export const isFn = () => true";
 * t.is(getFunctionName(fn), "isFn");
 * ```
 */
export const getFunctionName = (line) => {
    return line.split(" ")[2];
};
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
 * transform a value via callback
 *
 * @doctest
 * ```js
 * t.is(then(1, (n) => n + 1), 2)
 * ```
 */
export const then = (a, cb) => {
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
export const insertAt = (arr, index, item) => {
    arr.splice(index, 0, item);
};
//# sourceMappingURL=util.js.map