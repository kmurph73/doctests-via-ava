import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";

import { myCompact } from "./util.js";

import fg from "fast-glob";
import path from "path";

export const createDoctests = async (dir: string): Promise<void> => {
  // const files = fs.readdirSync(dir).map((file) => {
  //   return jsOrTsX.test(file) ? `${dir}/${file}` : null;
  // });

  const glob = path.join(dir, "**/*.js");
  const files = await fg(glob);

  const groups = parseFiles(myCompact(files));
  writeTests(groups, dir);
};
