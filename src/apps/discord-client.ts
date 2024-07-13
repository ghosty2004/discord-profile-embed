import { Client } from 'discord.js';
import createDebug from 'debug';

const debug = createDebug('app:apps:discord-bot');

const client = new Client({
  intents: [
    'GuildMembers',
    'GuildMessages',
    'DirectMessages',
    'MessageContent',
    'GuildPresences',
  ],
});

client.on('ready', () => {
  debug('Logged in as %s', client.user?.username);
});

client.login(process.env.TOKEN);

export default client;
