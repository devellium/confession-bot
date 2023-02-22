import { SparkClient } from '@spark.ts/handler';
import { env } from './util/env.js';
import { Partials } from 'discord.js';

const client = new SparkClient({
  intents: ['Guilds', 'MessageContent', 'GuildMessages', 'DirectMessages'],
  partials: [Partials.Channel, Partials.Message],
  directories: {
    commands: './dist/commands',
    events: './dist/events',
  },
  logLevel: 'debug',
  prefix: '',
});

client.login(env.DISCORD_TOKEN);
