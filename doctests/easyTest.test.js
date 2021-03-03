import test from "ava";
import { sum,concat,isPresent,mutatingConcat,getDiff,pipe,arrAt } from "./dist/Users/kmurph/code/ts/ts-ava-doctests/test_files/easyTest.js";

test("test sum", (t) => {
  t.is(sum(1, 2), 3);
  t.is(sum(4, 4), 8);
});

test("test concat", (t) => {
   t.is(concat("a", "b"), "ab");
});

test("test isPresent", (t) => {
  t.true(isPresent("x"));
  t.false(isPresent(' '));
  t.false(isPresent(undefined));
  t.false(isPresent(null));
});

test("test mutatingConcat", (t) => {
  const arr1 = [1,2];
  const arr2 = [3,4];
  mutatingConcat(arr1, arr2);
  
  t.deepEqual(arr1, [1,2,3,4]);
});

test("test getDiff", (t) => {
  const diff = getDiff({a: 1, b: 1, c: 9}, {a: 1, b: 2});
  t.deepEqual(diff, {b: 2});
});

test("test pipe", (t) => {
  const result = pipe(1, (n) => n + 1);
  t.is(result, 2);
});

test("test arrAt", (t) => {
  t.is(arrAt([1,2,3,4], -1), 4);
  t.is(arrAt([1,2,3,4], -2), 3);
  t.is(arrAt([1,2,3,4], 0), 1);
});