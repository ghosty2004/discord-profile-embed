import express from 'express';
import { renderToString } from 'react-dom/server';
import createDebug from 'debug';
import App from '../components/App';
import { fetchUser, fetchUserAssetToBase64 } from '../natives/discord';
import { ExpectedAny } from '../types';
import {
  addDataUriPrefix,
  convertClassToTailwindInlineStyle,
} from '../utils/misc';

const debug = createDebug('app:apps:express-api');

const app = express();

app.get('/:userId', async ({ params: { userId } }, res) => {
  try {
    const user = await fetchUser(userId);

    console.log(user.avatarDecorationURL());

    const [avatarAsBase64Str, bannerAsBase64Str] = await Promise.all([
      fetchUserAssetToBase64(user, 'avatar'),
      fetchUserAssetToBase64(user, 'banner'),
    ]);

    debug('User: %o', user);

    const html = convertClassToTailwindInlineStyle(
      renderToString(
        App({
          username: user.username,
          status: 'Idk',
          avatarDataUri: addDataUriPrefix(avatarAsBase64Str, 'image/png'),
          ...(bannerAsBase64Str && {
            bannerDataUri: addDataUriPrefix(bannerAsBase64Str, 'image/png'),
          }),
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
