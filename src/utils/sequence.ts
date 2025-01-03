import { ExpectedAsyncFunction, ExpectedFunction } from '../types';
import createDebug from 'debug';

const debug = createDebug('app:utils:sequence');

export const sequenceInitialization = async (
  ...sequences: ReturnType<typeof defineSequence>[]
) => {
  for (const [index, { name, fn, runCondition }] of sequences.entries()) {
    if (!runCondition()) {
      debug('Skipped sequence %d: %s', index, name);
      continue;
    }

    await fn();
    debug('Started sequence %d: %s', index, name);
  }
};

export const defineSequence = (
  name: string,
  fn: ExpectedFunction | ExpectedAsyncFunction,
  runCondition: () => boolean = () => true,
) => ({
  name,
  fn,
  runCondition,
});
