import { FC } from 'react';
import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { DataGridSekeltonRow } from './DataGridSkeletonRow';
import { DataGridRow } from './DataGridRow';
import styled from 'styled-components';
import { SelectionState } from '../../types';
import { DataGridHeader, DataGridRow as DataGridRowType } from './types';
import { CheckboxCell } from './CheckboxCell';

const StyledTableContainer = styled(TableContainer)({
  userSelect: 'none',
  height: 600,
});

const StyledTableHead = styled(TableHead)({
  whiteSpace: 'nowrap',
});

export interface TableProps {
  selectionState: SelectionState;
  onAggregatedCheckboxClick: () => void;
  headers: DataGridHeader[];
  list: DataGridRowType[];
  getIsRowSelected: (id: string) => boolean;
  isLoading: boolean;
  getIsRowSubscribed: (id: string) => boolean;
  getIsRowChecked: (id: string) => boolean;
  onRowCheck: (id: number) => void;
  onRowClick: (id: number) => void;
}

export const Table: FC<TableProps> = ({
  selectionState,
  onAggregatedCheckboxClick,
  headers,
  isLoading,
  list,
  getIsRowSubscribed,
  getIsRowChecked,
  onRowCheck,
  onRowClick,
}) => (
  <StyledTableContainer>
    <MuiTable size="small">
      <StyledTableHead>
        <TableRow>
          <CheckboxCell
            state={selectionState}
            onClick={onAggregatedCheckboxClick}
          />
          {headers.map(({ node }, index) => (
            <TableCell key={index}>{node}</TableCell>
          ))}
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => (
            <DataGridSekeltonRow cellsCount={headers.length} key={index} />
          ))}
        {!isLoading &&
          list.map((row) => (
            <DataGridRow
              isSubscribed={getIsRowSubscribed(row.id.toString())}
              isChecked={getIsRowChecked(row.id.toString())}
              onCheck={() => {
                onRowCheck(row.id);
              }}
              onClick={() => {
                onRowClick(row.id);
              }}
              key={row.id}
              {...row}
            />
          ))}
      </TableBody>
    </MuiTable>
  </StyledTableContainer>
);
