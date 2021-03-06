import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataGridRow } from './DataGridRow';
import { Pagination } from '../Pagination';
import { DataGridSekeltonRow } from './DataGridSkeletonRow';
import { DataGridHeader, DataGridRow as DataGridRowType } from './types';

export interface DataGridProps {
  headers: DataGridHeader[];
  rows?: DataGridRowType[];
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onClickRow: (id: string | number) => void;
}

export const DataGrid: FC<DataGridProps> = ({
  rows = [],
  headers,
  onNext,
  onPrev,
  isLoading,
  hasNext,
  hasPrev,
  onClickRow,
}) => (
  <div>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            <TableCell
              style={{
                width: 1,
                paddingRight: 0,
                visibility: 'hidden',
              }}
            />
            {headers.map(({ node }, index) => (
              <TableCell style={{}} key={index}>
                {node}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading &&
            Array.from({ length: 10 }, (_, index) => (
              <DataGridSekeltonRow cellsCount={headers.length} key={index} />
            ))}
          {!isLoading &&
            rows.map((row) => (
              <DataGridRow onClick={onClickRow} key={row.id} {...row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
      hasNext={hasNext}
      hasPrev={hasPrev}
      onNext={onNext}
      onPrev={onPrev}
    />
  </div>
);
