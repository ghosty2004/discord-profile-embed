import { tailwindToCSS } from 'tw-to-css';
import config from '../../tailwind.config';
import { ExpectedAny, ExpectedStr } from '../types';

const { twi: TWI, twj: TWJ } = tailwindToCSS({
  config: {
    theme: config.theme,
  },
});

export const twi = TWI;

const cacheTwj = new Map<ExpectedStr, ExpectedAny>();

export const twj = (input: ExpectedStr) => {
  if (cacheTwj.has(input)) {
    return cacheTwj.get(input);
  }

  const result = TWJ(input, { minify: true });
  cacheTwj.set(input, result);

  return result;
};
