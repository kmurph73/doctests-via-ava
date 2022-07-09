import test from "ava";
import { sum,concat,isPresent,mutatingConcat,getDiff,pipe,arrAt,shallowEqual,isErrorResponse,getFunctionName,assertArraysEq } from "../dist/test_files/easyTest.js";

test("sum", (t) => {
  t.is(sum(1, 2), 3)
  t.is(sum(4, 4), 8)
});

test.only("concat", (t) => {
   t.is(concat("a", "b"), "ab")
});

test("isPresent", (t) => {
  t.true(isPresent("x"))
  t.false(isPresent(' '))
  t.false(isPresent(undefined))
  t.false(isPresent(null))
});

test("mutatingConcat", (t) => {
  const arr1 = [1,2];
  const arr2 = [3,4];
  mutatingConcat(arr1, arr2)
  
  t.deepEqual(arr1, [1,2,3,4])
});

test("getDiff", (t) => {
  const diff = getDiff({a: 1, b: 1, c: 9}, {a: 1, b: 2});
  t.deepEqual(diff, {b: 2})
});

test("pipe", (t) => {
  const result = pipe(1, (n) => n + 1)
  t.is(result, 2)
});

test("arrAt", (t) => {
  t.is(arrAt([1,2,3,4], -1), 4)
  t.is(arrAt([1,2,3,4], -2), 3)
  t.is(arrAt([1,2,3,4], 0), 1)
});

test("shallowEqual", (t) => {
  t.true(shallowEqual({a: 1}, {a: 1}))
  t.false(shallowEqual({a: 2}, {a: 1}))
  t.false(shallowEqual({a: 1, b: 2}, {a: 1}))
});

test("isErrorResponse", (t) => {
  t.true(isErrorResponse({errors: ['asdf']}))
  t.false(isErrorResponse({error: ['asdf']}))
  t.false(isErrorResponse(null))
});

test("getFunctionName", (t) => {
  let fn = "export const isFn = () => true";
  t.is(getFunctionName(fn), "isFn");
  fn = "export function isFn() { return true }";
  t.is(getFunctionName(fn), "isFn");
  fn = "export function isFn () { return true }";
  t.is(getFunctionName(fn), "isFn");
  fn = "export function isFn<T>(a: T) { return true }";
  t.is(getFunctionName(fn), "isFn");
});

test("assertArraysEq", (t) => {
  t.true(assertArraysEq([1,2,3], [1,2,3]))
  try {
    assertArraysEq([1,2,4], [1,2,3])
    t.fail()
  } catch(e) {
    t.pass()
    console.log('error: ', e)
  }
});