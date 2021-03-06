import React, { FC, useEffect, useState } from 'react';
import {
  DataGrid,
  DataGridHeaderProps,
  DataGridRowProps,
} from '../../components/DataGrid';
import { getFormattedText } from '../../utils/textFormat';
import { fieldConfig } from './fieldsConfig';
import mockData from '../../CFEC2.json';

const load = (start: number, end: number) => mockData.matches.slice(start, end);

const PER_PAGE = 10;

export const MatchListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [hasMore, setHasMore] = useState(false);
  const [aggregateRows, setAggregateRows] = useState<DataGridRowProps[][]>([]);
  const headers: DataGridHeaderProps[] = fieldConfig.map(({ title }) => ({
    node: title,
  }));
  const rows = aggregateRows[currentPage];
  const areRowsLoaded = !!rows;

  const handleNext = () => {
    console.log('next');
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (areRowsLoaded) {
      return;
    }
    // console.log(currentPage * PER_PAGE);
    const data = load(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);
    console.log(currentPage * PER_PAGE, PER_PAGE);
    const newRows = data.map((match) => ({
      id: match.id,
      cells: fieldConfig.map(({ key, type }) => {
        const value = (match as any)[key];
        return getFormattedText(value, type as any);
      }),
    }));
    setAggregateRows((prev) => {
      const newAggregateRows = [...prev];
      newAggregateRows[currentPage] = newRows;

      return newAggregateRows;
    });
  }, [currentPage, areRowsLoaded]);

  return (
    <DataGrid
      onNext={handleNext}
      onPrev={handlePrev}
      rows={rows}
      headers={headers}
    />
  );
};
