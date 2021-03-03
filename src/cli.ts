#!/usr/bin/env node

import { testFiles } from "../src/testFiles.js";

const dir = process.argv[2];

if (dir == null || dir.trim() === "") {
  console.error(
    'you must pass in a directory to ts-ava-doctests eg `yarn ts-ava-doctests "./src"`'
  );
} else {
  console.log(`writing files in ${dir}`);

  testFiles(dir);
}
