import { ExpectedAsyncFunction, ExpectedFunction } from '../types';
import createDebug from 'debug';

const debug = createDebug('app:utils:sequence');

export const sequenteInitialization = async (
  ...sequences: ReturnType<typeof defineSequente>[]
) => {
  for (const [index, { name, fn }] of sequences.entries()) {
    await fn();
    debug('Started sequence %d: %s', index, name);
  }
};

export const defineSequente = (
  name: string,
  fn: ExpectedFunction | ExpectedAsyncFunction,
) => ({
  name,
  fn,
});
