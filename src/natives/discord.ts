import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';
import client from '../apps/discord-client';
import { ExpectedNull, ExpectedStr, TBioNode } from '../types';
import { makeIterableFromReader } from '../utils/generators';
import { IUserAssets, IUserProfile } from '../interface';
import { User } from 'discord.js';
import { addDataUriPrefix } from '../utils/misc';

export const fetchMember = async (userId: ExpectedStr) => {
  const guildId = process.env.GUILD_ID as ExpectedStr;
  return client.guilds.fetch(guildId).then((guild) =>
    guild.members.fetch({
      user: userId,
      withPresences: true,
    }),
  );
};

export const fetchUserAssets = (userId: string): Promise<IUserAssets> =>
  fetch(`https://discord.com/api/v8/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((user) => ({
      ...user,
      avatarUri: user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : null,
      bannerUri: user.banner
        ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=512`
        : null,
      decorationUri: user.avatar_decoration_data?.asset
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=128&passthrough=true`
        : null,
    }));

export const fetchUserAssetToBase64 = (
  assetEndpoint: ExpectedStr | ExpectedNull,
) =>
  new Promise<string | null>(async (resolve, reject) => {
    if (!assetEndpoint) return resolve(null);

    const res = await fetch(assetEndpoint);
    const reader = res.body?.getReader();
    if (!reader) return;

    const chunks: Uint8Array[] = [];
    Readable.from(makeIterableFromReader(reader))
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'));
      })
      .on('error', () => {
        reject();
      });
  });

export const getUserBadgesAsDataUri = async (
  user: User,
): Promise<ExpectedStr[]> => {
  return (await Promise.all(
    (user.flags?.toArray() ?? [])
      .map((flag) =>
        readFile(`./assets/${flag}.svg`)
          .then((buf) =>
            addDataUriPrefix(buf.toString('base64'), 'image/svg+xml'),
          )
          .catch(() => null),
      )
      .filter(Boolean),
  )) as string[];
};

export const fetchProfileEffects = () =>
  fetch('https://discord.com/api/v9/user-profile-effects', {
    headers: {
      authorization: process.env.CLIENT_TOKEN!,
    },
  })
    .then((res) => res.json())
    .then(({ profile_effect_configs }) => profile_effect_configs);

export const fetchUserProfile = async (
  userId: ExpectedStr,
): Promise<IUserProfile | ExpectedNull> => {
  return fetch(`https://discord.com/api/v9/users/${userId}/profile`, {
    method: 'GET',
    headers: {
      Authorization: process.env.CLIENT_TOKEN!,
    },
  })
    .then((res) => res.json())
    .catch(() => null);
};

export const badgesToBase64DataUriFromUserProfile = (profile: IUserProfile) => {
  const badgesEndpoints = profile.badges.map(
    ({ icon: iconIdentifier }) =>
      `https://cdn.discordapp.com/badge-icons/${iconIdentifier}.png`,
  );

  return Promise.all(
    badgesEndpoints
      .map(fetchUserAssetToBase64)
      .map((promise) =>
        promise.then((dataUri) =>
          dataUri ? addDataUriPrefix(dataUri, 'image/png') : null,
        ),
      )
      .filter(Boolean) as Promise<ExpectedStr>[],
  );
};

export const extractBioWithEmojisToNode = async (bio: ExpectedStr) => {
  const lines = bio.split('\n');

  const emoteRegex = /<:.+?:(\d+)>/g;
  const animatedEmoteRegex = /<a:.+?:(\d+)>/g;

  const results = lines.map((line) => {
    let nodes = [];

    let match;
    let lastIndex = 0;
    while ((match = emoteRegex.exec(line)) !== null) {
      const emojiId = match[1];
      const index = match.index;
      const emojiEndpoint = `https://cdn.discordapp.com/emojis/${emojiId}.png`;

      if (index > lastIndex) {
        const text = line.substring(lastIndex, index);
        nodes.push({ type: 'char', value: text });
      }

      nodes.push({
        type: 'emoji',
        value: emojiEndpoint,
      });

      lastIndex = index + match[0].length;
    }

    while ((match = animatedEmoteRegex.exec(line)) !== null) {
      const emojiId = match[1];
      const index = match.index;
      const emojiEndpoint = `https://cdn.discordapp.com/emojis/${emojiId}.gif`;

      if (index > lastIndex) {
        const text = line.substring(lastIndex, index);
        nodes.push({ type: 'char', value: text });
      }

      nodes.push({
        type: 'emoji',
        value: emojiEndpoint,
      });

      lastIndex = index + match[0].length;
    }

    if (lastIndex < line.length) {
      const text = line.substring(lastIndex);
      nodes.push({ type: 'char', value: text });
    }

    return nodes;
  });

  // return results as unknown as TBioNode;

  return Promise.all(
    results.map((line) =>
      Promise.all(
        line.map(async (node) => ({
          ...node,
          value:
            node.type === 'emoji'
              ? addDataUriPrefix(
                  (await fetchUserAssetToBase64(node.value))!,
                  'image/png',
                )
              : node.value,
        })),
      ),
    ),
  ) as unknown as TBioNode;
};
