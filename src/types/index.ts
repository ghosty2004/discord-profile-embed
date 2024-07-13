export type ExpectedAny = any;
export type ExpectedAsyncFunction = (...args: any[]) => Promise<any>;
export type ExpectedFunction = (...args: any[]) => any;
export type ExpectedStr = string;
export type ExpectedInt = number;
export type ExpectedBoolean = boolean;
export type ExpectedNull = null;
export type ExpectedArray<T> = T[];

export type TBioNode = {
  type: 'char' | 'emoji';
  value: ExpectedStr;
}[][];
