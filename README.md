# doctests-con-ava
doctests (via [ava](https://github.com/avajs/ava)) for javascript

### installing

`npm install doctests-con-ava` or `yarn add doctests-con-ava`

### usage

Write your comments in normal JS Doc format, but instead of using `@example` use `@doctest` or `@doctests` (either/or), followed by a js code block, EG:

```typescript
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
```

Then add a script in your `package.json`:
```json
  "scripts": {
    "doctest": "doctests-con-ava './dist/src' && ava test ./doctests/**/*.js"
   }
 ```

Running `yarn doctest` (or the npm equivalent) will transform your doctests into regular ava tests, and then run them.  It's up to you whether to add `./doctests` to your `.gitignore` or not.
