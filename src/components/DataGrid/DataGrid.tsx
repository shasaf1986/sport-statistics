import React, { FC } from 'react';
import { CheckBox } from '@material-ui/icons';
import { DataGridRow } from './DataGridRow';
import { Pagination } from '../Pagination';
import { DataGridSekeltonRow } from './DataGridSkeletonRow';
import { DataGridHeader, DataGridRow as DataGridRowType } from './types';
import {
  UsePaginationFetchResult,
  UsePaginationFetchArgs,
  usePagination,
} from '../../hooks/usePagination';
import { CheckboxCell } from './CheckboxCell';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useSelectionItems } from '../../hooks/useSelection';

export interface DataGridFetchFnArgs extends UsePaginationFetchArgs {}
export interface DataGridFetchFnResult
  extends UsePaginationFetchResult<DataGridRowType> {}

export type DataGridFetchFn = (
  args: DataGridFetchFnArgs
) => Promise<DataGridFetchFnResult>;
export interface DataGridProps {
  headers: DataGridHeader[];
  fetchFn: DataGridFetchFn;
  onClickRow: (id: string | number) => void;
}

export const DataGrid: FC<DataGridProps> = ({
  headers,
  onClickRow,
  fetchFn,
}) => {
  const {
    currentList,
    hasNext,
    goToNextPage,
    goToPrevPage,
    hasPrev,
    isLoading,
    list,
  } = usePagination({ fetchFn });
  const {
    getIsSelected,
    toggle,
    partialState,
    togglePartialList,
    toggleList,
  } = useSelectionItems(list, currentList);

  return (
    <div>
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button
          onClick={toggleList}
          variant="text"
          color="default"
          startIcon={<CheckBox />}
        >
          Select all
        </Button>
      </div>

      <Paper>
        <TableContainer
          style={{
            height: 600,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                <CheckboxCell
                  state={partialState}
                  onClick={togglePartialList}
                />
                {headers.map(({ node }, index) => (
                  <TableCell key={index}>{node}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading &&
                Array.from({ length: 10 }, (_, index) => (
                  <DataGridSekeltonRow
                    cellsCount={headers.length}
                    key={index}
                  />
                ))}
              {!isLoading &&
                currentList.map((row) => (
                  <DataGridRow
                    isChecked={getIsSelected(row.id)}
                    onCheck={() => {
                      toggle(row.id);
                    }}
                    onClick={() => {
                      onClickRow(row.id);
                    }}
                    key={row.id}
                    {...row}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={goToNextPage}
          onPrev={goToPrevPage}
        />
      </Paper>
    </div>
  );
};
