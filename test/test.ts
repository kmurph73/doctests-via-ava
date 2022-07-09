import test from "ava";
import { createDoctests } from "../src/createDoctests.js";

test("doctesting js, all pass", async (t) => {
  // const base = "./test_files";

  // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
  // const groups = parseFiles(files);
  // writeTests(groups);

  await createDoctests("./dist/test_files");

  t.pass();
});

test("doctesting ts, all pass", async (t) => {
  // const base = "./test_files";

  // const files = fs.readdirSync(base).map((file) => `${base}/${file}`);
  // const groups = parseFiles(files);
  // writeTests(groups);

  await createDoctests("./test_files", { ts: true });

  t.pass();
});
