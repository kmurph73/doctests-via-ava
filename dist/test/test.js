import test from "ava";
import { createDoctests } from "../src/createDoctests.js";
test("doctesting js, all pass", (t) => {
    // const base = "./test_files";
    // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
    // const groups = parseFiles(files);
    // writeTests(groups);
    createDoctests("./dist/test_files");
    t.pass();
});
test("doctesting ts, all pass", (t) => {
    // const base = "./test_files";
    // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
    // const groups = parseFiles(files);
    // writeTests(groups);
    createDoctests("./test_files", { ts: true });
    t.pass();
});
//# sourceMappingURL=test.js.map