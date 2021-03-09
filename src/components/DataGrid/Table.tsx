import {
  TableContainer,
  TableHead,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { SekeltonRow } from './SkeletonRow';
import { Row } from './Row';
import styled from 'styled-components';
import { BaseEntity, SelectedState, SortedState } from '../../types';
import { DataGridConfig } from './types';
import { CheckboxCell } from './CheckboxCell';

const StyledTableContainer = styled(TableContainer)({
  userSelect: 'none',
  height: 600,
});

const StyledTableHead = styled(TableHead)({
  // whiteSpace: 'nowrap',
});

export interface TableProps<T> {
  selectedState: SelectedState;
  onAggregatedCheckboxClick: () => void;
  config: DataGridConfig;
  list: T[];
  isLoading: boolean;
  getIsRowSubscribed: (id: number) => boolean;
  getIsRowChecked: (id: number) => boolean;
  onRowCheck: (id: number) => void;
  onRowClick: (id: number) => void;
  showCheckboxes: boolean;
  onSortChange: (key: string) => void;
  sortedFields: Record<string, SortedState>;
}

export const Table = <T extends BaseEntity>({
  selectedState,
  onAggregatedCheckboxClick,
  config,
  isLoading,
  list,
  getIsRowSubscribed,
  getIsRowChecked,
  onRowCheck,
  onRowClick,
  showCheckboxes,
  onSortChange,
  sortedFields,
}: TableProps<T>) => (
  <StyledTableContainer>
    <MuiTable size="small">
      <StyledTableHead>
        <TableRow>
          <CheckboxCell
            isVisible={showCheckboxes}
            isDisabled={isLoading}
            state={selectedState}
            onClick={onAggregatedCheckboxClick}
          />
          {config.map(({ textHeader, key }) => (
            <TableCell
              onClick={() => {
                onSortChange(key);
              }}
              key={key}
            >
              <TableSortLabel
                active={!!sortedFields[key]}
                direction={sortedFields[key]}
              >
                {textHeader}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => (
            <SekeltonRow
              showChecbox={showCheckboxes}
              cellsCount={config.length}
              key={index}
            />
          ))}
        {!isLoading &&
          list.map((row) => (
            <Row
              config={config}
              data={row}
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
