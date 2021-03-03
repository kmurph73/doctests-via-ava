import fs from "fs";
import { findGroups } from "./findGroups.js";
import { CodeGroup } from "./types";

export const parseFiles = (files: string[]): CodeGroup[] => {
  const allGroups: CodeGroup[] = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index]!;

    const code = fs.readFileSync(file, "utf8");

    const allLines = code.split("\n").map((l) => l.trimRight());

    const groups = findGroups(allLines, file);
    allGroups.push(...groups);
  }

  return allGroups;
};
