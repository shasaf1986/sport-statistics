import { TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FC } from 'react';
import { CheckboxCell } from './CheckboxCell';

export interface SekeltonRowProps {
  cellsCount: number;
}

export const SekeltonRow: FC<SekeltonRowProps> = ({ cellsCount }) => (
  <TableRow>
    <CheckboxCell />
    {Array.from({ length: cellsCount }, (_, index) => (
      <TableCell key={index}>
        <Skeleton />
      </TableCell>
    ))}
  </TableRow>
);
