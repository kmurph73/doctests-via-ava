import test from "ava";
import { addThree } from "../dist/test_files/mas/addThree.js";

test("test addThree", (t) => {
  t.is(addThree(1), 4);
  t.is(addThree(4), 7);
});