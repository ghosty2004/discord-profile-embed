import createDebug from 'debug';
import { sequenteInitialization, defineSequente } from './utils/sequente';

const debug = createDebug('app:index');

(async () => {
  debug('Booting');

  await sequenteInitialization(
    defineSequente('Inject env variables to process', async () => {
      const { config } = await import('dotenv');
      config({ path: '.env.dev' });
    }),

    defineSequente(
      'Discord client',
      async () => await import('./apps/discord-client'),
    ),

    defineSequente(
      'Express app',
      async () => await import('./apps/express-api'),
    ),
  );

  debug('Done');
})();
