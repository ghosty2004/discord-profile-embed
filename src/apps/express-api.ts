import express from 'express';
import { renderToString } from 'react-dom/server';
import createDebug from 'debug';
import App from '../components/App';
import {
  fetchMember,
  fetchUserAssets,
  fetchUserAssetToBase64,
  getUserBadgesAsDataUri,
} from '../natives/discord';
import { ExpectedAny } from '../types';
import {
  addDataUriPrefix,
  convertClassToTailwindInlineStyle,
} from '../utils/misc';

const debug = createDebug('app:apps:express-api');

const app = express();

app.get('/:userId', async ({ params: { userId } }, res) => {
  try {
    const member = await fetchMember(userId);

    console.log(member.premiumSince);

    if (!member.presence)
      return res.send('Cannot fetch member presence').status(404);

    const [userAssets, userBadgesAsDataUris] = await Promise.all([
      fetchUserAssets(member.user.id),
      getUserBadgesAsDataUri(member.user),
    ]);

    const [avatarAsBase64Str, bannerAsBase64Str, decorationAsBase64Str] =
      await Promise.all([
        fetchUserAssetToBase64(userAssets.avatarUri),
        fetchUserAssetToBase64(userAssets.bannerUri),
        fetchUserAssetToBase64(userAssets.decorationUri),
      ]);

    const html = convertClassToTailwindInlineStyle(
      renderToString(
        App({
          username: member.user.username,
          status: member.presence?.status,
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
          badgeDataUris: userBadgesAsDataUris,
        }),
      ),
    );

    res.status(200);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(html);
  } catch (err: ExpectedAny) {
    if ('rawError' in err) {
      res.send(err.rawError.message);
    } else {
      res.send('Internal server error').status(500);
      console.error(err);
    }
  }
});

app.listen(3000, () => {
  debug('Listening on port 3000');
});
