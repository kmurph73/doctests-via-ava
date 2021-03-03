import test from "ava";
import { testFiles } from "../src/testFiles.js";

test("doctesting, all pass", (t) => {
  // const base = "./test_files";

  // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
  // const groups = parseFiles(files);
  // writeTests(groups);

  testFiles(process.cwd() + "/test_files");

  t.pass();
});
