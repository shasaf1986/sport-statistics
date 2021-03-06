import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { FC } from 'react';

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
    <TableCell
      style={{
        // opacity: isHovering ? 1 : 0,
        visibility: 'hidden',
        // borderColor: isHovering ? undefined : 'transparent',
        paddingRight: 0,
        width: 1,
      }}
    >
      <Checkbox
        style={{
          // visibility: isHovering ? undefined : 'hidden',
          padding: 0,
        }}
        color="primary"
      />
    </TableCell>
    {Array.from({ length: cellsCount }, (_, index) => (
      <TableCell key={index}>
        <Skeleton />
      </TableCell>
    ))}
  </TableRow>
);
