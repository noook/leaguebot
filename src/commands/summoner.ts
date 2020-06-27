import { CommandoClient, CommandoMessage, Command } from 'discord.js-commando';
import { getSummoner, getSummonerStats } from '@/league-api';
import { MessageEmbed } from 'discord.js';

interface CommandArguments {
  summoner: string;
}

export default class SummonerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'summoner',
      group: 'summoner',
      memberName: 'summoner',
      description: 'Fetches informations on a summoner',
      examples: ['!summoner Noook'],
      args: [
        {
          key: 'summoner',
          prompt: 'Which user would you like to have information on ?',
          type: 'string',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { summoner }: CommandArguments) {
    const [foundSummoner, summonerError] = await getSummoner(summoner);
    if (summonerError !== null) {
      return msg.reply(summonerError);
    }

    const [summonerStats, summonerStatsError] = await getSummonerStats(foundSummoner);

    if (summonerStatsError !== null) {
      return msg.reply(summonerStatsError);
    }

    const soloQ = summonerStats.find(({ queueType }) => queueType === 'RANKED_SOLO_5x5');

    const embed = new MessageEmbed();
    embed
      .setTitle(foundSummoner.name)
      .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/10.13.1/img/profileicon/${foundSummoner.profileIconId}.png`)
      .setColor('#EAD15F')
      .addField('Rank', `${soloQ.tier} ${soloQ.rank}`, true)
      .addField('Points', soloQ.leaguePoints)
      .addField('Wins', soloQ.wins, true)
      .addField('Losses', soloQ.losses, true);

    return msg.replyEmbed(embed);
  }
};