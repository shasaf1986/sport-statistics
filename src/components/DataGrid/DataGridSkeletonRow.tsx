import { TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { FC } from 'react';
import { CheckboxCell } from './CheckboxCell';

export interface DataGridSekeltonRowProps {
  cellsCount: number;
}

export const DataGridSekeltonRow: FC<DataGridSekeltonRowProps> = ({
  cellsCount,
}) => (
  <TableRow
    style={{
      userSelect: 'none',
      cursor: 'pointer',
    }}
  >
    <CheckboxCell />
    {Array.from({ length: cellsCount }, (_, index) => (
      <TableCell key={index}>
        <Skeleton />
      </TableCell>
    ))}
  </TableRow>
);
