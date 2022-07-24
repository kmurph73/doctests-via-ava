import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";

import { myCompact } from "./util.js";
import fg from "fast-glob";
import { DoctestOptions } from "./types.js";

export const createDoctests = async (
  glob: string,
  opts?: DoctestOptions
): Promise<void> => {
  const files = await fg(glob);

  const groups = parseFiles(myCompact(files));
  await writeTests(groups, opts);
};
