#!/usr/bin/env node
import { createDoctests } from "./createDoctests.js";
const dir = process.argv[2];
const thirdOPt = process.argv[3];
if (dir == null || dir.trim() === "") {
    console.error('you must pass in a directory to doctests-via-ava eg `yarn doctests-via-ava "./src"`');
}
else if (thirdOPt != null && thirdOPt !== "--ts") {
    console.error(`a third argument was passed in of ${thirdOPt}, which should not be there at all`);
}
else {
    createDoctests(dir);
}
//# sourceMappingURL=cli.js.map