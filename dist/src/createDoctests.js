import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact } from "./util.js";
import path from "path";
import fg from "fast-glob";
export const createDoctests = async (dir, opts) => {
    const glob = "**/*.{js,ts}";
    const fullGlob = path.join(dir, glob);
    const files = await fg(fullGlob);
    const groups = parseFiles(myCompact(files));
    writeTests(groups, opts);
};
//# sourceMappingURL=createDoctests.js.map