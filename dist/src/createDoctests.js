import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact } from "./util.js";
import fg from "fast-glob";
export const createDoctests = async (glob, opts) => {
    const files = await fg(glob);
    const groups = parseFiles(myCompact(files));
    writeTests(groups, opts);
};
//# sourceMappingURL=createDoctests.js.map