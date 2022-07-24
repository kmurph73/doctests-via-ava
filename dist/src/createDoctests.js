import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact } from "./util.js";
import fg from "fast-glob";
export const createDoctests = (glob, opts) => {
    const files = fg.sync(glob);
    const groups = parseFiles(myCompact(files));
    writeTests(groups, opts);
};
//# sourceMappingURL=createDoctests.js.map