/**
 * gets function name
 *
 * @doctest_only
 * ```js
 * let fn = "const isFn = () => true";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: false});
 *
 * let fn = "export const isFn = () => true";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: true});
 *
 * fn = "export function isFn() { return true }";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: true});
 *
 * fn = "function isFn() { return true }";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: false});
 *
 * fn = "export function isFn () { return true }";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: true});
 *
 * fn = "export function isFn<T>(a: T) { return true }";
 * t.is(getFunctionName(fn), {fn: "isFn", exports: true});
 * ```
 */
export function getFunctionName(line) {
    const parts = line.trim().split(" ");
    const exports = parts[0] === "export";
    let fn = exports ? parts[2] : parts[1];
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
    return { fn, exports };
}
/**
 * gets class name
 *
 * @doctest_only
 * ```js
 * let klass = "export class RequiredMap {";
 * t.is(getClassName(klass), "RequiredMap");
 *
 * klass = "export class RequiredMap<T> {";
 * t.is(getClassName(klass), "RequiredMap");
 * ```
 */
export function getClassName(line) {
    const klass = line.split(" ")[2];
    if (klass == null) {
        throw new Error(`class name couldnt be found for: ${line}`);
    }
    if (/\</.test(klass)) {
        klass = klass.split("<")[0];
    }
    return klass;
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
 * const arr = [1, 2];
 * insertAt(arr, 1, 4);
 * t.deepEqual(arr, [1, 4, 2]);
 * ```
 */
export const insertAt = (arr, index, item) => {
    arr.splice(index, 0, item);
};
/**
 * remove null/undefined from an array
 *
 * @doctest
 * ```js
 * const arr = [1, undefined, 2, null, 3]
 * t.deepEqual(myCompact(arr), [1,2,3])
 * ```
 */
export const myCompact = (arr) => {
    const nextArr = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element != null) {
            nextArr.push(element);
        }
    }
    return nextArr;
};
//# sourceMappingURL=util.js.map