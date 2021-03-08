import delay from 'delay';
import mockData from './mockData.json';

export const fetchMatchDetails = async (
  ids: number[],
  start: number,
  end: number
) => {
  await delay(1000);

  const fullList = mockData['match-details']
    .filter((matchDetail) => ids.includes(matchDetail['match-id']))
    .map((matchDetail) => {
      const match = mockData.matches.find(
        ({ id }) => matchDetail['match-id'] === id
      )!;
      return {
        ...matchDetail,
        ...match,
      };
    })
    .map((data) => ({
      homeTeam: data['home-team'],
      awayTeam: data['away-team'],
      awayFouls: data['away-fouls'],
      homeFouls: data['home-fouls'],
      q1: data.q1,
      q2: data.q2,
      q3: data.q3,
      q4: data.q4,
      mvp: data.MVP,
      date: data.date,
      homeTeamImage: data['Home-Picture'],
      awayTeamImage: data['Away-Picture'],
      mvpImage: data['MVP-Picture'],
      referee: data.referee,
    }));

  return {
    result: fullList.slice(start, end),
    hasMore: end < fullList.length,
  };
};
