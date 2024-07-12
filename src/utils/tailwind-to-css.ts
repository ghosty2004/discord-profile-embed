import { tailwindToCSS } from 'tw-to-css';
import config from '../../tailwind.config';

const { twi, twj } = tailwindToCSS({
  config: {
    theme: config.theme,
  },
});

export { twi, twj };
