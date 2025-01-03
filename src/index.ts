import createDebug from 'debug';
import { sequenceInitialization, defineSequence } from './utils/sequence';
import { ExpectedAny, ExpectedArray } from './types';

const debug = createDebug('app:index');

(async () => {
  debug('Booting environment %s', process.env.NODE_ENV);

  await sequenceInitialization(
    defineSequence(
      'Inject env variables to process',
      async () => {
        const { config } = await import('dotenv');
        config({ path: '.env.dev' });
        console.log(process.env.TOKEN);
      },
      () => process.env.NODE_ENV === 'dev',
    ),

    defineSequence(
      'Discord client',
      async () => await import('./apps/discord-client'),
    ),

    defineSequence('Cacher', async () => {
      const { profileEffectsCache, addToCache } = await import('./apps/cacher');
      const { fetchProfileEffects } = await import('./natives/discord');

      const profileEffects = await fetchProfileEffects().then(
        (effects: ExpectedArray<ExpectedAny>) =>
          effects.map(({ id, effects: [{ src: effectUriEndpoint }] }) => ({
            id,
            effectUriEndpoint,
          })),
      );

      for (const { id, effectUriEndpoint } of profileEffects) {
        addToCache(profileEffectsCache, id, effectUriEndpoint);
      }
    }),

    defineSequence(
      'Express app',
      async () => await import('./apps/express-api'),
    ),
  );

  debug('Done');
})();
