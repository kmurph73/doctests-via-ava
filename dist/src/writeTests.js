import fs from "fs";
import path from "path";
import { getRelativeDepth, removeBaseDir } from "./util.js";
const cwd = process.cwd();
const doctestDir = cwd + "/doctests";
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
const createLines = (fullFileName, groups, baseDir) => {
    const fnsToImport = [];
    const allLines = [];
    const depth = getRelativeDepth(baseDir, fullFileName);
    const backDots = Array(depth).fill("..").join("/");
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
    const importLine = `import test from "ava";\nimport { ${imports} } from "${backDots}/${fullFileName}";`;
    const contents = importLine + "\n" + allLines.join("\n");
    debugger;
    return contents;
};
export const writeTests = async (allGroups, baseDir) => {
    const grouped = groupGroups(allGroups);
    fs.rmSync(doctestDir, { recursive: true, force: true });
    fs.mkdirSync(doctestDir);
    console.log("writeTests");
    for (const fullFilePath in grouped) {
        const groups = grouped[fullFilePath];
        console.log("ummm");
        debugger;
        const fileContents = createLines(fullFilePath, groups, baseDir);
        const parts = path.parse(fullFilePath);
        const fileName = parts.name + ".test.js";
        const realPath = removeBaseDir(baseDir, fullFilePath);
        console.log("where");
        const realParts = path.parse(realPath);
        const realDir = path.join(doctestDir, realParts.dir);
        console.log("wtf");
        if (realDir.length > 0 && !fs.existsSync(realDir)) {
            fs.mkdirSync(realDir, { recursive: true });
        }
        const finalPath = path.join(realDir, fileName);
        console.log("finalPath: ", finalPath);
        fs.writeFileSync(finalPath, fileContents);
    }
};
//# sourceMappingURL=writeTests.js.map