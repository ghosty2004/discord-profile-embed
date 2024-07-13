import { Config } from 'tailwindcss';

export default {
  content: ['./src/components/**/*.tsx'],
  theme: {
    extend: {},
    fontFamily: {
      default: [
        'Century Gothic',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
  },
} as Config;
