import * as dotenv from 'dotenv';
import Bot from './bot';
import { resolve } from 'path';

dotenv.config({
  path: resolve(process.cwd(), '.env.local'),
});

const bot = new Bot({
  owner: process.env.BOT_OWNER,
});

bot
  .start(process.env.BOT_TOKEN);
  
bot.on('ready', () => bot.user.setPresence({
  activity: {
    name: 'Meow.',
  },
}));
