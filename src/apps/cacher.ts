import createDebug from 'debug';
import { ExpectedAny, ExpectedStr } from '../types';

const debug = createDebug('app:apps:cacher');

// caches
export const profileEffectsCache = new Map<ExpectedStr, ExpectedStr>();

export const addToCache = (
  ref: Map<ExpectedAny, ExpectedAny>,
  key: ExpectedAny,
  value: ExpectedAny,
) => {
  ref.set(key, value);
  debug('Added to cache: %s with value: %s', key, value);
};
