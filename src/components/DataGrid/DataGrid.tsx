import React, { FC, ReactNode } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataGridRowProps, DataGridRow } from './DataGridRow';
import { Pagination } from '../Pagination';

export interface DataGridHeaderProps {
  node: ReactNode;
}

export interface DataGridProps {
  headers: DataGridHeaderProps[];
  rows?: DataGridRowProps[];
  onNext: () => void;
  onPrev: () => void;
}

export const DataGrid: FC<DataGridProps> = ({
  rows = [],
  headers,
  onNext,
  onPrev,
}) => (
  <div>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
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
          {rows.map((row) => (
            <DataGridRow key={row.id} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination onNext={onNext} onPrev={onPrev} />
  </div>
);
