import { GroupState } from "./types.js";
import { getClassName, getFunctionName } from "./util.js";
const doctestRegex = /\s*\*\s@doctests?/;
const doctestOnlyRegex = /@doctests?_only/;
const fnRegex = /^export (const|function)/;
const classRegex = /^export class/;
const jsTickRegex = /```js$/;
const jsTickEndRegex = /```$/;
const commentEndRegex = /\*\/$/;
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
            else if (GroupState.OutsideOfComment && fnRegex.test(line)) {
                groups.push(currentGroup);
                currentGroup.state = GroupState.Donezo;
                const fn = getFunctionName(line);
                currentGroup.functionName = fn;
                currentGroup = null;
            }
            else if (GroupState.OutsideOfComment && classRegex.test(line)) {
                groups.push(currentGroup);
                currentGroup.state = GroupState.Donezo;
                const klass = getClassName(line);
                currentGroup.className = klass;
                currentGroup = null;
            }
            else if (commentEndRegex.test(line)) {
                currentGroup.state = GroupState.OutsideOfComment;
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