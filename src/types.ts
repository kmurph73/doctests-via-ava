export enum GroupState {
  Begun,
  WithinCode,
  Donezo,
}

export type CodeGroup = {
  fileName: string;
  functionName?: string;
  className?: string;
  startingLine: number;
  testStartEndLines: [number | null, number | null];
  functionOrClassStartIndex?: number;
  doctestStartIndex?: number;
  doctestEndIndex?: number;
  lines: string[];
  tests: Test[];
  state: GroupState;
  only: boolean;
};

export type Test = {
  loc: number;
  passed: boolean;
};
