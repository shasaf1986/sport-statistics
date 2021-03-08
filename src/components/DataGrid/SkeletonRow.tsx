import { TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FC } from 'react';
import { CheckboxCell } from './CheckboxCell';

export interface SekeltonRowProps {
  cellsCount: number;
  showChecbox: boolean;
}

export const SekeltonRow: FC<SekeltonRowProps> = ({
  cellsCount,
  showChecbox,
}) => (
  <TableRow>
    <CheckboxCell isDisabled={true} isVisible={showChecbox} />
    {Array.from({ length: cellsCount }, (_, index) => (
      <TableCell key={index}>
        <Skeleton />
      </TableCell>
    ))}
  </TableRow>
);
