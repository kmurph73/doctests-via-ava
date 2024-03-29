import fs from "fs";

import { CodeGroup, DoctestOptions } from "./types.js";
import { arrAt } from "./util.js";

const cwd = process.cwd();
const dir = cwd + "/doctests";

const groupGroupsByFilename = (
  groups: CodeGroup[]
): { [fileName: string]: CodeGroup[] } => {
  const obj: { [fileName: string]: CodeGroup[] } = {};

  for (let index = 0; index < groups.length; index++) {
    const group = groups[index]!;
    const arr = obj[group.fileName];
    if (arr === undefined) {
      obj[group.fileName] = [group];
    } else {
      arr.push(group);
    }
  }

  return obj;
};

const createLines = (fullFileName: string, groups: CodeGroup[]): string => {
  const fnsToImport: string[] = [];
  const allLines: string[] = [];

  for (let index = 0; index < groups.length; index++) {
    const group = groups[index]!;
    const [start, end] = group.testStartEndLines!;
    let lines = group.lines.slice(start!, end! + 1).map((l) => `  ${l}`);
    lines = lines.map((l) => {
      const line = l.trim().replace(/^\*\s?/, "");

      return `  ${line}`;
    });

    const name = group.functionName || group.className;
    if (!name) {
      throw new Error(
        `function or class name should be here for group:\n${JSON.stringify(
          group
        )}`
      );
    }

    let test = `\ntest("${name}", (t) => {\n`;
    test += lines.join("\n");
    test += "\n});";

    allLines.push(test);
    fnsToImport.push(name);
  }

  const imports = fnsToImport.join(",");
  const importLine = `import test from "ava";\nimport { ${imports} } from "../${fullFileName.replace(
    /\.ts$/,
    ".js"
  )}";`;

  const contents = importLine + "\n" + allLines.join("\n");

  return contents;
};

export const writeTests = (
  allGroups: CodeGroup[],
  opts?: DoctestOptions
): void => {
  const onlyGroups = allGroups.filter((g) => g.only);
  const hasOnly = onlyGroups.length > 0;
  const groups = hasOnly ? onlyGroups : allGroups;
  const grouped = groupGroupsByFilename(groups);

  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);

  for (const fullFileName in grouped) {
    const groups = grouped[fullFileName]!;

    const fileContents = createLines(fullFileName, groups);
    let file = arrAt(fullFileName.split("/"), -1)!;
    const ending = opts?.ts === true ? ".test.ts" : ".test.js";

    file = file.replace(/\.(js|ts)$/, ending);
    fs.writeFileSync(dir + `/${file}`, fileContents);
  }
};
