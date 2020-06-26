import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';

export default class SummonerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'summoner',
      group: 'summoner',
      memberName: 'summoner',
      description: 'Fetches informations on a summoner',
      examples: ['!summoner Noook'],
    });
  }

  run(msg: CommandoMessage) {
    return msg.reply('Meow.');
  }
};