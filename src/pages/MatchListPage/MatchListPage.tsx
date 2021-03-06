import React, { FC } from 'react';
import {
  DataGrid,
  DataGridHeaderProps,
  DataGridRowProps,
} from '../../components/DataGrid';
import { fieldConfig } from './fieldsConfig';
import mockData from '../../CFEC2.json';

export const MatchListPage: FC = () => {
  const headers: DataGridHeaderProps[] = fieldConfig.map(({ title }) => ({
    node: title,
  }));
  const rows: DataGridRowProps[] = mockData.matches.map((match) => ({
    id: match.id,
    cells: fieldConfig.map(({ key }) => (match as any)[key]),
  }));

  return <DataGrid rows={rows} headers={headers} />;
};
