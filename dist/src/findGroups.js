import { GroupState } from "./types.js";
import { getFunctionName } from "./util.js";
const doctestRegex = /\s*\*\s@doctests?/;
const doctestOnlyRegex = /@doctests?\.only/;
const fnRegex = /^export (const|function)/;
const jsTickRegex = /```js$/;
const jsTickEndRegex = /```$/;
export const findGroups = (lines, fileName) => {
    const groups = [];
    let currentGroup = null;
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (currentGroup !== null) {
            currentGroup.lines.push(line);
            if (currentGroup.state === GroupState.Begun && jsTickRegex.test(line)) {
                currentGroup.state = GroupState.WithinCode;
                currentGroup.testStartEndLines[0] =
                    index - currentGroup.startingLine + 1;
            }
            else if (jsTickEndRegex.test(line)) {
                currentGroup.testStartEndLines[1] =
                    index - currentGroup.startingLine - 1;
            }
            else if (fnRegex.test(line)) {
                if (!GroupState.WithinCode) {
                    throw new Error("should be WithinCode at this point");
                }
                groups.push(currentGroup);
                currentGroup.state = GroupState.Donezo;
                const fn = getFunctionName(line);
                currentGroup.functionName = fn;
                currentGroup = null;
            }
        }
        else if (doctestRegex.test(line)) {
            currentGroup = {
                fileName,
                testStartEndLines: [null, null],
                startingLine: index,
                tests: [],
                lines: [line],
                state: GroupState.Begun,
                only: doctestOnlyRegex.test(line),
            };
        }
    }
    return groups;
};
//# sourceMappingURL=findGroups.js.map