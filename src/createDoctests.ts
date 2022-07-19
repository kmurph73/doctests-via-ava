import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";

import { myCompact } from "./util.js";
import path from "path";
import fg from "fast-glob";
import { DoctestOptions } from "./types.js";

export const createDoctests = async (
  dir: string,
  opts?: DoctestOptions
): Promise<void> => {
  const glob = "**/*.{js,ts}";
  const fullGlob = path.join(dir, glob);

  const files = await fg(fullGlob);

  const groups = parseFiles(myCompact(files));
  writeTests(groups, opts);
};
