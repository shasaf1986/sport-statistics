import React, { FC } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
} from '../../components/DataGrid';
import { getFormattedText } from '../../utils/textFormat';
import { fieldConfig } from './fieldsConfig';
import mockData from '../../CFEC2.json';
import { usePagination } from '../../hooks/usePagination';
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

const PER_PAGE = 10;

export const MatchListPage: FC = () => {
  const history = useHistory();
  const headers: DataGridHeader[] = fieldConfig.map(({ title }) => ({
    node: title,
  }));
  const {
    currentList,
    isLoading,
    triggerNextPage,
    triggerPrevPage,
    hasNext,
    hasPrev,
  } = usePagination<DataGridRow>(async (page) => {
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

  const handleClickRow = (id: string | number) => {
    history.push(`/match-details/${id}`, { isModal: true });
  };

  return (
    <DataGrid
      onClickRow={handleClickRow}
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
