import fs from "fs";
import util from "util";
import { arrAt } from "./util.js";
const rm = util.promisify(fs.rm);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const cwd = process.cwd();
const dir = cwd + "/doctests";
const groupGroupsByFilename = (groups) => {
    const obj = {};
    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        const arr = obj[group.fileName];
        if (arr === undefined) {
            obj[group.fileName] = [group];
        }
        else {
            arr.push(group);
        }
    }
    return obj;
};
const createLines = (fullFileName, groups) => {
    const fnsToImport = [];
    const allLines = [];
    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        const [start, end] = group.testStartEndLines;
        let lines = group.lines.slice(start, end + 1).map((l) => `  ${l}`);
        lines = lines.map((l) => {
            const line = l.trim().replace(/^\*\s?/, "");
            return `  ${line}`;
        });
        const name = group.functionName || group.className;
        if (!name) {
            throw new Error(`function or class name should be here for group:\n${JSON.stringify(group)}`);
        }
        let test = `\ntest("${name}", (t) => {\n`;
        test += lines.join("\n");
        test += "\n});";
        allLines.push(test);
        fnsToImport.push(name);
    }
    const imports = fnsToImport.join(",");
    const importLine = `import test from "ava";\nimport { ${imports} } from "../${fullFileName.replace(/\.ts$/, ".js")}";`;
    const contents = importLine + "\n" + allLines.join("\n");
    return contents;
};
export const writeTests = async (allGroups, opts) => {
    const onlyGroups = allGroups.filter((g) => g.only);
    const hasOnly = onlyGroups.length > 0;
    const groups = hasOnly ? onlyGroups : allGroups;
    const grouped = groupGroupsByFilename(groups);
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir);
    for (const fullFileName in grouped) {
        const groups = grouped[fullFileName];
        const fileContents = createLines(fullFileName, groups);
        let file = arrAt(fullFileName.split("/"), -1);
        const ending = opts?.ts === true ? ".test.ts" : ".test.js";
        file = file.replace(/\.(js|ts)$/, ending);
        await writeFile(dir + `/${file}`, fileContents);
    }
};
//# sourceMappingURL=writeTests.js.map