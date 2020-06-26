import { resolve } from 'path';
import * as dotenv from 'dotenv';
import Bot from './bot';
import setupCommando from './commands';

dotenv.config({
  path: resolve(process.cwd(), '.env.local'),
});

const bot = new Bot({
  owner: process.env.BOT_OWNER,
  commandPrefix: process.env.BOT_PREFIX,
});

setupCommando(bot);

bot.on('ready', () => bot.user.setPresence({
  activity: {
    name: 'Meow.',
  },
}));

bot.start(process.env.BOT_TOKEN);
