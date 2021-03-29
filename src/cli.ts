#!/usr/bin/env node

import { createDoctests } from "./createDoctests.js";

const dir = process.argv[2];
const tsOpt = process.argv[3];

if (dir == null || dir.trim() === "") {
  console.error(
    'you must pass in a directory to doctests-via-ava eg `yarn doctests-via-ava "./src"`'
  );
} else if (tsOpt != null && tsOpt !== "--ts") {
  console.error(
    `a third argument was passed in of ${tsOpt}, which should be "--ts", or nothing`
  );
} else {
  const ts = tsOpt === "--ts";

  createDoctests(dir, { ts });
}
