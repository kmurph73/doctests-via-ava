import fs from "fs";
import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";

import child_process from "child_process";
import util from "util";
const exec = util.promisify(child_process.exec);

export const testFiles = async (dir: string): Promise<void> => {
  const files = fs.readdirSync(dir).map((file) => `${dir}/${file}`);
  const groups = parseFiles(files);
  writeTests(groups);

  // const doctestDir = process.cwd() + `/doctests`;

  // const cmd = `yarn ava test "${doctestDir}/**/*.js"`;

  // console.log("wat");
  // try {
  //   const result = child_process.execSync(cmd);
  // } catch (error) {
  //   debugger;
  // }
};
