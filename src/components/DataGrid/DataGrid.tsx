import React, { FC, useMemo, useState } from 'react';
import { DataGridRow } from './DataGridRow';
import { Pagination } from '../Pagination';
import { DataGridSekeltonRow } from './DataGridSkeletonRow';
import { DataGridHeader, DataGridRow as DataGridRowType } from './types';
import { CheckboxCell, CheckboxState } from './CheckboxCell';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

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
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>(
    {}
  );
  const selectedRowCount = useMemo(
    () =>
      rows.reduce((acc, { id }) => {
        if (selectedRowIds[id]) {
          return acc + 1;
        }
        return acc;
      }, 0),
    [selectedRowIds, rows]
  );

  const areAllRowsSelected = selectedRowCount === rows.length;
  const checkboxState: CheckboxState =
    selectedRowCount === 0
      ? 'off'
      : areAllRowsSelected
      ? 'on'
      : 'indeterminate';

  const handleSelectRow = (id: string | number) => {
    onClickRow(id);
  };
  const handleCheckRow = (id: string | number) => {
    setSelectedRowIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleAggregateCheckboxClick = () => {
    const shouldCheckAll = checkboxState === 'off';
    setSelectedRowIds((prev) =>
      rows.reduce(
        (acc, row) => ({
          ...acc,
          [row.id]: shouldCheckAll,
        }),
        { ...prev }
      )
    );
  };

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              <CheckboxCell
                state={checkboxState}
                onClick={handleAggregateCheckboxClick}
              />
              {headers.map(({ node }, index) => (
                <TableCell key={index}>{node}</TableCell>
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
                <DataGridRow
                  isChecked={!!selectedRowIds[row.id]}
                  onCheck={() => {
                    handleCheckRow(row.id);
                  }}
                  onClick={() => {
                    handleSelectRow(row.id);
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
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
};
