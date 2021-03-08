import { FC } from 'react';
import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { SekeltonRow } from './SkeletonRow';
import { Row } from './Row';
import styled from 'styled-components';
import { SelectionState } from '../../types';
import { DataGridHeader, DataGridRow } from './types';
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
  list: DataGridRow[];
  isLoading: boolean;
  getIsRowSubscribed: (id: number) => boolean;
  getIsRowChecked: (id: number) => boolean;
  onRowCheck: (id: number) => void;
  onRowClick: (id: number) => void;
  showCheckboxes: boolean;
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
  showCheckboxes,
}) => (
  <StyledTableContainer>
    <MuiTable size="small">
      <StyledTableHead>
        <TableRow>
          <CheckboxCell
            isVisible={showCheckboxes}
            isDisabled={isLoading}
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
            <SekeltonRow
              showChecbox={showCheckboxes}
              cellsCount={headers.length}
              key={index}
            />
          ))}
        {!isLoading &&
          list.map((row) => (
            <Row
              showCheckbox={showCheckboxes}
              isSubscribed={getIsRowSubscribed(row.id)}
              isChecked={getIsRowChecked(row.id)}
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
