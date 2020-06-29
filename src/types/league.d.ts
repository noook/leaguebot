export interface SummonerInfo {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

export interface MiniSeries {
  losses: number;
  wins: number;
  progress: string;
  target: number;
}

export interface SummonerRankedInfo {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: 'I' | 'II' | 'III' | 'IV' | 'V';
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  miniSeries?: MiniSeries;
}

export interface ChampionMastery {
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  championId: number;
  lastPlayTime: number;
  championLevel: number;
  summonerId: string;
  championPoints: number;
  championPointsSinceLastLevel: number;
  tokensEarned: number;
}

