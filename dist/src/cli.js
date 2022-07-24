#!/usr/bin/env node
import { createDoctests } from "./createDoctests.js";
const glob = process.argv[2];
const tsOpt = process.argv[3];
if (glob == null || glob.trim() === "") {
    console.error("you must pass in a glob to doctests-via-ava eg `yarn doctests-via-ava src/**/*.js`");
}
else if (tsOpt != null && tsOpt !== "--ts") {
    console.error(`a third argument was passed in of ${tsOpt}, which should be "--ts", or nothing`);
}
else {
    await createDoctests(glob);
}
//# sourceMappingURL=cli.js.map