import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";

import { myCompact } from "./util.js";
import fg from "fast-glob";
import { DoctestOptions } from "./types.js";

export const createDoctests = (glob: string, opts?: DoctestOptions): void => {
  const files = fg.sync(glob);

  const groups = parseFiles(myCompact(files));
  writeTests(groups, opts);
};
