import test from "ava";
import fs from "fs";
import { createDoctests } from "../src/createDoctests.js";
test("create doctests, convert to js", (t) => {
    const glob = "test_files/**/*.ts";
    createDoctests(glob);
    t.pass();
    // const files = fs.readdirSync("doctests");
    // const expectedFiles = [
    //   "addThree.test.js",
    //   "easyTest.test.js",
    //   "testClass.test.js",
    // ];
    // t.deepEqual(files, expectedFiles);
});
test("test single file", (t) => {
    const glob = "what.js";
    createDoctests(glob);
    const files = fs.readdirSync("doctests");
    const expectedFiles = ["easyTest.test.js"];
    t.deepEqual(files, expectedFiles);
});
test.only("create doctests for ts files", (t) => {
    const glob = "test_files/**/*.ts";
    createDoctests(glob, { ts: true });
    const files = fs.readdirSync("doctests");
    const expectedFiles = [
        "addThree.test.ts",
        "easyTest.test.ts",
        "testClass.test.ts",
    ];
    t.deepEqual(files, expectedFiles);
});
//# sourceMappingURL=test.js.map