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
  return {
    result: mockData.matches.slice(start, end),
    hasMore: end < mockData.matches.length,
  };
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
    hasNext,
    hasPrev,
  } = usePagination(async (page) => {
    const { result, hasMore } = await load(
      page * PER_PAGE,
      (page + 1) * PER_PAGE
    );
    const rows = result.map((match) => ({
      id: match.id,
      cells: fieldConfig.map(({ key, type }) => {
        const value = (match as any)[key];
        return getFormattedText(value, type as any);
      }),
    }));
    return {
      hasMore,
      list: rows,
    };
  });

  return (
    <DataGrid
      hasNext={hasNext}
      hasPrev={hasPrev}
      isLoading={isLoading}
      onNext={triggerNextPage}
      onPrev={triggerPrevPage}
      rows={currentList}
      headers={headers}
    />
  );
};
