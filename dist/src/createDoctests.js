import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact } from "./util.js";
import path from "path";
import fg from "fast-glob";
export const createDoctests = async (dir) => {
    const glob = path.join(dir, "**/*.js");
    const files = await fg(glob);
    const groups = parseFiles(myCompact(files));
    writeTests(groups);
};
//# sourceMappingURL=createDoctests.js.map