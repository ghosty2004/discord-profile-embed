import { User } from 'discord.js';
import { Readable } from 'node:stream';
import client from '../apps/discord-client';
import { ExpectedStr } from '../types';
import { makeIterableFromReader } from '../utils/generators';

export const fetchUser = async (userId: ExpectedStr) => {
  const user = await client.users.fetch(userId);
  return user;
};

export const fetchUserAssetToBase64 = <
  T extends 'avatar' | 'banner' | 'decoration',
>(
  user: User,
  assetType: T,
) =>
  new Promise<T extends 'banner' ? string | undefined : string>(
    async (resolve, reject) => {
      const assetEndpoint =
        assetType === 'avatar'
          ? user.displayAvatarURL({ extension: 'png' })
          : assetType === 'banner'
          ? user.bannerURL({ extension: 'png', size: 1024 })
          : '';

      if (!assetEndpoint) return;

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
    },
  );
