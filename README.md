# doctests-via-ava

doctests (via [ava](https://github.com/avajs/ava)) for javascript

### Installing

`npm install doctests-via-ava` or `yarn add doctests-via-ava`

### Usage

Write your comments in normal JS Doc format, but instead of using `@example` use `@doctest` or `@doctests` (either/or), followed by a JS code block, EG:

````typescript
/**
 * sums two numbers
 *
 * @doctests
 * ```js
 * t.is(sum(1, 2), 3)
 * t.is(sum(4, 4), 8)
 * ```
 */
export const sum = (a: number, b: number): number => {
  return a + b;
};
````

Next, add a script in your `package.json`:

```json
  "scripts": {
    "doctest": "doctests-via-ava ./dist/src && ava test ./doctests/*.js"
   }
```

Running `yarn doctest` (or the npm equivalent) will transform your doctests into regular ava tests, and then run them. Up to you whether to add `doctests` to `.gitignore` or not.

_All_ this lib does is transform your doctests into regular ava tests. As such, it can only doctest exported functions (since it needs to import them from the original source).

For example, the above `sum` function would compile down to the ava test of:

```js
test("test sum", (t) => {
  t.is(sum(1, 2), 3);
  t.is(sum(4, 4), 8);
});
```

### TypeScript

If you're compiling your TS manually, simply point the `doctests-via-ava` CLI command at TS's `outDir` (see above). If you're using something like create-react-app or ts-node that's compiling your TS for you, support for that is in the works, but not currently available.

### Stage of development

This lib is very new, probably buggy, and only really handles the happy path. This will improve over time.

### License

MIT
