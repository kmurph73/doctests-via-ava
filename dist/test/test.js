import test from "ava";
import fs from "fs";
import util from "util";
import { createDoctests } from "../src/createDoctests.js";
const readDir = util.promisify(fs.readdir);
test("create doctests, convert to js", async (t) => {
    const glob = "test_files/**/*.ts";
    await createDoctests(glob);
    const files = await readDir("doctests");
    const expectedFiles = [
        "addThree.test.js",
        "easyTest.test.js",
        "testClass.test.js",
    ];
    t.deepEqual(files, expectedFiles);
});
test.only("create doctests for ts files", async (t) => {
    const glob = "test_files/**/*.ts";
    await createDoctests(glob, { ts: true });
    const files = await readDir("doctests");
    const expectedFiles = [
        "addThree.test.ts",
        "easyTest.test.ts",
        "testClass.test.ts",
    ];
    t.deepEqual(files, expectedFiles);
});
//# sourceMappingURL=test.js.map