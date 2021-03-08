import delay from 'delay';
import mockData from './mockData.json';

export const fetchMatchList = async (start: number, end: number) => {
  await delay(1000);

  return {
    result: mockData.matches.slice(start, end),
    hasMore: end < mockData.matches.length,
  };
};
