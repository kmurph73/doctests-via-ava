import fs from "fs";
import { parseFiles } from "./parseFiles.js";
import { writeTests } from "./writeTests.js";
import { myCompact } from "./util.js";
const jsOrTsX = /\.(js|ts)x?$/;
export const createDoctests = async (dir) => {
    const files = fs.readdirSync(dir).map((file) => {
        return jsOrTsX.test(file) ? `${dir}/${file}` : null;
    });
    const groups = parseFiles(myCompact(files));
    writeTests(groups);
};
//# sourceMappingURL=createDoctests.js.map