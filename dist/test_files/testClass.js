/**
 * A 1:1 map, throws error if cannot find thing via `get`
 * @constructor
 * @param {T[]} arr - Array of things (that respond to `toString()`)
 * @param {Key} attr - Attr of a thing
 *
 * @doctest
 * ```js
 * const arr = [{a: 1}, {a: 2}];
 *
 * const map = new RequiredMap(arr, 'a');
 *
 * t.deepEqual(map.get('1'), {a: 1});
 * ```
 */
export class RequiredMap {
    obj;
    constructor(arr, attr) {
        this.obj = {};
        for (let index = 0; index < arr.length; index++) {
            const ele = arr[index];
            const val = ele[attr].toString();
            this.obj[val] = ele;
        }
    }
    get(attr) {
        const val = this.obj[attr];
        if (!val) {
            throw new Error(`couldnt find val for attr ${attr}`);
        }
        return val;
    }
}
//# sourceMappingURL=testClass.js.map