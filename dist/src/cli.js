#!/usr/bin/env node
import { createDoctests } from "./createDoctests.js";
const dir = process.argv[2];
if (dir == null || dir.trim() === "") {
    console.error('you must pass in a directory to doctests-via-ava eg `yarn doctests-via-ava "./src"`');
}
else {
    createDoctests(dir);
}
//# sourceMappingURL=cli.js.map