import fs from "fs";
import { arrAt } from "./util.js";
const cwd = process.cwd();
const dir = cwd + "/doctests";
const groupGroups = (groups) => {
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
            let line = l.trim().replace(/^\*\s?/, "");
            if (line.length && !line.endsWith(";")) {
                line = line + ";";
            }
            return `  ${line}`;
        });
        let test = `\ntest("test ${group.functionName}", (t) => {\n`;
        test += lines.join("\n");
        test += "\n});";
        allLines.push(test);
        fnsToImport.push(group.functionName);
    }
    const imports = fnsToImport.join(",");
    const importLine = `import test from "ava";\nimport { ${imports} } from "../${fullFileName}";`;
    const contents = importLine + "\n" + allLines.join("\n");
    return contents;
};
export const writeTests = async (allGroups) => {
    const grouped = groupGroups(allGroups);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir);
    for (const fullFileName in grouped) {
        const groups = grouped[fullFileName];
        const fileContents = createLines(fullFileName, groups);
        let file = arrAt(fullFileName.split("/"), -1);
        file = file.replace(/\.js$/, ".test.js");
        fs.writeFileSync(dir + `/${file}`, fileContents);
    }
};
//# sourceMappingURL=writeTests.js.map