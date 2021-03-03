export enum GroupState {
  Begun,
  WithinCode,
  Donezo,
}

export type CodeGroup = {
  fileName: string;
  functionName?: string;
  startingLine: number;
  testStartEndLines: [number | null, number | null];
  functionStartIndex?: number;
  doctestStartIndex?: number;
  doctestEndIndex?: number;
  lines: string[];
  tests: Test[];
  state: GroupState;
  failedCount: number;
};

export type Test = {
  loc: number;
  passed: boolean;
};
