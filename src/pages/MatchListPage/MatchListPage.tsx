import React, { FC } from 'react';
import { DataGrid, DataGridHeaderProps } from '../../components/DataGrid';
import { getFormattedText } from '../../utils/textFormat';
import { fieldConfig } from './fieldsConfig';
import mockData from '../../CFEC2.json';
import { usePagination } from '../../hooks/usePagination';

const delay = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

const load = async (start: number, end: number) => {
  await delay();
  return mockData.matches.slice(start, end);
};

const PER_PAGE = 10;

export const MatchListPage: FC = () => {
  const headers: DataGridHeaderProps[] = fieldConfig.map(({ title }) => ({
    node: title,
  }));
  const {
    currentList,
    isLoading,
    triggerNextPage,
    triggerPrevPage,
  } = usePagination(async (page) => {
    const data = await load(page * PER_PAGE, (page + 1) * PER_PAGE);
    return data.map((match) => ({
      id: match.id,
      cells: fieldConfig.map(({ key, type }) => {
        const value = (match as any)[key];
        return getFormattedText(value, type as any);
      }),
    }));
  });

  return (
    <DataGrid
      isLoading={isLoading}
      onNext={triggerNextPage}
      onPrev={triggerPrevPage}
      rows={currentList}
      headers={headers}
    />
  );
};
