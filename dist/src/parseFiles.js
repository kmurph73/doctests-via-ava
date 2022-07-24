import fs from "fs";
import { findGroups } from "./findGroups.js";
export const parseFiles = (files) => {
    const allGroups = [];
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const code = fs.readFileSync(file, "utf8");
        const allLines = code.split("\n").map((l) => l.trimEnd());
        const groups = findGroups(allLines, file);
        allGroups.push(...groups);
    }
    return allGroups;
};
//# sourceMappingURL=parseFiles.js.map