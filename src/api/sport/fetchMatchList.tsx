import delay from 'delay';
import { SortedField } from '../../types';
import mockData from './mockData.json';

export const fetchMatchList = async (
  start: number,
  end: number,
  sortBy: SortedField[]
) => {
  await delay(1000);

  const sortedList = [...mockData.matches];
  // very basic sorting ...
  sortBy.forEach(({ key, state }) => {
    if (state) {
      sortedList.sort((fieldA, fieldB) => {
        const valueA = (fieldA as any)[key];
        const valueB = (fieldB as any)[key];
        const isABigger = valueA > valueB;
        if (isABigger && state === 'asc') {
          return 1;
        }
        if (!isABigger && state === 'desc') {
          return 1;
        }
        return -1;
      });
    }
  });

  return {
    result: sortedList.slice(start, end),
    hasMore: end < sortedList.length,
  };
};
