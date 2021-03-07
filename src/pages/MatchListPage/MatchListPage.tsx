import React, { FC } from 'react';
import {
  DataGrid,
  DataGridHeader,
  // DataGridRow,
  DataGridFetchFn,
} from '../../components/DataGrid';
// import { getFormattedText } from '../../utils/textFormat';
import { fieldConfig } from './fieldsConfig';
import mockData from '../../CFEC2.json';
import { useHistory } from 'react-router-dom';

const delay = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

const load = async (start: number, end: number) => {
  await delay();
  return {
    result: mockData.matches.slice(start, end),
    hasMore: end < mockData.matches.length,
  };
};

const headers: DataGridHeader[] = fieldConfig.map(({ title }) => ({
  node: title,
}));

const fetchFn: DataGridFetchFn = async ({ start, end }) => {
  const { hasMore, result } = await load(start, end);
  return {
    hasMore,
    partialList: result.map(({ id, ...rest }) => ({
      id,
      cells: fieldConfig.map(({ key }) => (rest as any)[key]),
    })),
  };
};

export const MatchListPage: FC = () => {
  const history = useHistory();
  const handleClickRow = (id: string | number) => {
    history.push(`/match-details/${id}`, { isModal: true });
  };

  return (
    <DataGrid fetchFn={fetchFn} onClickRow={handleClickRow} headers={headers} />
  );
};
