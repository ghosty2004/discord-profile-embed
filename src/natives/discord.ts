import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';
import client from '../apps/discord-client';
import { ExpectedNull, ExpectedStr } from '../types';
import { makeIterableFromReader } from '../utils/generators';
import { IUserAssets } from '../interface';
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

export const getUserBadgesAsDataUri = async (user: User): Promise<string[]> => {
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
