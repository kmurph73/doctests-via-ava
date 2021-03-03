import test from "ava";
import { createDoctests } from "../src/createDoctests.js";
test("doctesting, all pass", (t) => {
    // const base = "./test_files";
    // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
    // const groups = parseFiles(files);
    // writeTests(groups);
    createDoctests(process.cwd() + "/test_files");
    t.pass();
});
//# sourceMappingURL=test.js.map