#!/usr/bin/env node
import { createDoctests } from "./createDoctests.js";
let dir = process.argv[2];
let ts = false;
if (dir === "--ts") {
    ts = true;
    dir = process.argv[3];
}
if (dir == null || dir.trim() === "") {
    console.error('you must pass in a directory to doctests-con-ava eg `yarn doctests-con-ava "./src"`');
}
else {
    console.log(`writing files in ${dir}`);
    createDoctests(dir, { ts });
}
//# sourceMappingURL=cli.js.map