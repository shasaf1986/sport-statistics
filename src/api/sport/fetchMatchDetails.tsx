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
    });

  return {
    result: fullList.slice(start, end),
    hasMore: end < fullList.length,
  };
};
