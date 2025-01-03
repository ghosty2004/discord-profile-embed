import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import createDebug from 'debug';
import { format } from 'date-fns';
import App from '../components/App';
import {
  badgesToBase64DataUriFromUserProfile,
  extractBioWithEmojisToNode,
  fetchMember,
  fetchUserAssets,
  fetchUserAssetToBase64,
  fetchUserProfile,
} from '../natives/discord';
import { ExpectedAny } from '../types';
import { addDataUriPrefix, formatElapsedTime } from '../utils/misc';
import { ActivityType } from 'discord.js';
import { SpotifyActivity } from '../components/activities/Spotify';
import { GameActivity } from '../components/activities/Game';
import { profileEffectsCache } from './cacher';

const debug = createDebug('app:apps:express-api');

const app = express();

app.get('/favicon.ico', (req, res) => {
  res.status(204);
});

app.get('/:userId', async ({ params: { userId } }, res) => {
  try {
    debug('Fetching user %s', userId);

    const member = await fetchMember(userId);

    const [userProfile, userAssets] = await Promise.all([
      fetchUserProfile(member.user.id),
      fetchUserAssets(member.user.id),
    ]);

    debug('User profile fetched for %s', member.user.username);

    if (!userProfile)
      return res.send("Cannot fetch user's profile").status(404);

    const [
      avatarAsBase64Str,
      bannerAsBase64Str,
      decorationAsBase64Str,
      profileEffectAsBase64Str,
      userBadgesAsDataUris,
      userBioAsNode,
    ] = await Promise.all([
      fetchUserAssetToBase64(userAssets.avatarUri),
      fetchUserAssetToBase64(userAssets.bannerUri),
      fetchUserAssetToBase64(userAssets.decorationUri),
      userProfile.user_profile.profile_effect?.id
        ? fetchUserAssetToBase64(
            profileEffectsCache.get(
              userProfile.user_profile.profile_effect?.id,
            )!,
          )
        : undefined,
      badgesToBase64DataUriFromUserProfile(userProfile),
      extractBioWithEmojisToNode(userProfile.user_profile.bio),
    ]);

    debug('User assets fetched for %s', member.user.username);

    const currentActivity = await (async () => {
      const activity = member?.presence?.activities?.[0];

      switch (activity?.type) {
        case ActivityType.Listening:
          const start = activity.timestamps?.start!;
          const end = activity.timestamps?.end!;
          const now = new Date();

          const elapsed = format(
            new Date(now.getTime() - start.getTime()),
            'm:ss',
          );

          const totalDuration = format(
            new Date(end.getTime() - start.getTime()),
            'm:ss',
          );

          const progress = Math.floor(
            ((now.getTime() - start.getTime()) /
              (end.getTime() - start.getTime())) *
              100,
          );

          return new SpotifyActivity({
            albumDataUri: addDataUriPrefix(
              (await fetchUserAssetToBase64(
                activity.assets!.largeImageURL({ extension: 'png', size: 16 }),
              ))!,
              'image/png',
            ),
            songName: activity.details!,
            artistName: activity.state!,
            elapsed,
            totalDuration,
            progress,
          });
        case ActivityType.Playing:
          return new GameActivity({
            largeImageDataUri: addDataUriPrefix(
              (await fetchUserAssetToBase64(
                activity.assets!.largeImageURL({ extension: 'png', size: 16 }),
              ))!,
              'image/png',
            ),
            smallImageDataUri: addDataUriPrefix(
              (await fetchUserAssetToBase64(
                activity.assets!.smallImageURL({ extension: 'png', size: 16 }),
              ))!,
              'image/png',
            ),
            name: activity.name!,
            details: activity.details!,
            state: activity.state!,
            elapsed: formatElapsedTime(activity.timestamps!.start!),
          });
      }
    })();

    debug('User activity fetched for %s', member.user.username);

    const stream = renderToPipeableStream(
      App({
        username: member.user.username,
        globalName: userProfile.user.global_name,
        pronouns: userProfile.user_profile.pronouns,
        status: member.presence?.status || 'offline',
        bio: userBioAsNode,
        ...(userProfile.user.banner_color && {
          bannerColor: userProfile.user.banner_color,
        }),
        ...(avatarAsBase64Str && {
          avatarDataUri: addDataUriPrefix(avatarAsBase64Str, 'image/png'),
        }),
        ...(bannerAsBase64Str && {
          bannerDataUri: addDataUriPrefix(bannerAsBase64Str, 'image/png'),
        }),
        ...(decorationAsBase64Str && {
          avatarDecorationDataUri: addDataUriPrefix(
            decorationAsBase64Str,
            'image/png',
          ),
        }),
        ...(profileEffectAsBase64Str && {
          profileEffectDataUri: addDataUriPrefix(
            profileEffectAsBase64Str,
            'image/png',
          ),
        }),
        badgeDataUris: userBadgesAsDataUris,
        currentActivity,
      }),
      {
        onShellReady() {
          res.status(200);
          res.setHeader('Content-Type', 'image/svg+xml');
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          stream.pipe(res as any);
          debug("User %s's profile rendered", member.user.username);
        },
      },
    );
  } catch (err: ExpectedAny) {
    if ('rawError' in err) {
      res.send(err.rawError.message);
    } else {
      res.send('Internal server error').status(500);
      console.error(err);
    }
  }
});

const LISTEN_PORT = Number(process.env.LISTEN_PORT) || 3000;

app.listen(LISTEN_PORT, () => {
  debug('Listening on port %d', LISTEN_PORT);
});
