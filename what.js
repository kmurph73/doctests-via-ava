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
function shallowEqual(a, b) {
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