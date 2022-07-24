export enum GroupState {
  Begun,
  WithinCode,
  OutsideOfComment,
  Donezo,
}

export type CodeGroup = {
  fileName: string;
  functionName?: string;
  className?: string;
  startingLine: number;
  testStartEndLines: [number | null, number | null];
  lines: string[];
  tests: Test[];
  state: GroupState;
  only: boolean;
};

export type Test = {
  loc: number;
  passed: boolean;
};

export type DoctestOptions = {
  ts?: boolean;
};
