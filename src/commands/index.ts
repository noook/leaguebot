import { CommandoClient } from "discord.js-commando";
import SummonerCommand from './summoner';

export default function setupCommando(bot: CommandoClient) {
  bot
    .registry
    .registerDefaultTypes()
    .registerGroups([
      ['summoner', 'League of Legends'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
      commandState: false,
      unknownCommand: false,
      eval: false,
    })
    .registerCommand(SummonerCommand);
}