import axios, { AxiosError } from 'axios';
import { SummonerInfo, SummonerRankedInfo, ChampionMastery } from '@/types/league';

const baseURL = 'https://euw1.api.riotgames.com';
const instance = axios.create({
  baseURL,
  headers: {
    'X-Riot-Token': process.env.LEAGUE_API_KEY,
  },
});

import { data as champions } from '@/resources/champions.json';

const routes = {
  GET_SUMMONER: (summonerName: string) => `/lol/summoner/v4/summoners/by-name/${summonerName}`,
  GET_SUMMONER_MASTERIES: (encryptedSummonerId: string) => `/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`,
  GET_LEAGUE: (encryptedSummonerId: string) => `/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`,
};

export function findChampionByKey(key: number) {
  return Object.values(champions).find((championInfo) => championInfo.key === key.toString());
}

export function getSummoner(summonerName: string): Promise<[SummonerInfo, null | string]> {
  return instance.get<SummonerInfo>(routes.GET_SUMMONER(encodeURI(summonerName)))
    .then(({ data }) => [data, null] as [SummonerInfo, null])
    .catch((error: AxiosError) => {
      if (error.response.status === 404) {
        return [null, `Couldn't find summoner with name **${summonerName}**`];
      }

      return [null, `An error occurred while fetching summoner ${summonerName}.`];
    });
}

export function getSummonerStats(summoner: SummonerInfo): Promise<[SummonerRankedInfo[], null]>
export function getSummonerStats(summoner: SummonerInfo): Promise<[null, string]>
export function getSummonerStats(summoner: SummonerInfo): Promise<[SummonerRankedInfo[], null] | [null, string]> {
  return instance.get<SummonerRankedInfo[]>(routes.GET_LEAGUE(summoner.id))
    .then(({ data }) => [data, null] as [SummonerRankedInfo[], null])
    .catch((error: AxiosError) => {
      return [undefined, `An error occurred while fetching ranked data for ${summoner.name}`];
    });
}

export function getSummonerMasteries(summoner: SummonerInfo): Promise<[ChampionMastery[], null]>
export function getSummonerMasteries(summoner: SummonerInfo): Promise<[null, string]>
export function getSummonerMasteries(summoner: SummonerInfo): Promise<[ChampionMastery[], null] | [null, string]> {
  return instance.get<ChampionMastery[]>(routes.GET_SUMMONER_MASTERIES(summoner.id))
    .then(({ data }) => [data, null] as [ChampionMastery[], null])
    .catch((error: AxiosError) => {
      return [undefined, `An error occurred while fetching champions masteries for ${summoner.name}`];
    });
}
