import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact, then } from "./util.js";
import path from "path";
import fg from "fast-glob";
export const createDoctests = async (dir, opts) => {
    const glob = then(opts?.ts, (ts) => {
        const g = ts === true ? "**/*.ts" : "**/*.js";
        return path.join(dir, g);
    });
    const files = await fg(glob);
    const groups = parseFiles(myCompact(files));
    writeTests(groups, opts);
};
//# sourceMappingURL=createDoctests.js.map