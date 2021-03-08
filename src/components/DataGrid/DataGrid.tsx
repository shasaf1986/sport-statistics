import { FC, useContext } from 'react';
import { Pagination } from '../Pagination';
import { DataGridHeader, DataGridRow as DataGridRowType } from './types';
import {
  UsePaginationFetchResult,
  UsePaginationFetchArgs,
  usePagination,
} from '../../hooks/usePagination';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import { Paper } from '@material-ui/core';
import { Table } from './Table';
import { Toolbar } from './Toolbar';
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
  onShow: (id: number[]) => void;
}

export const DataGrid: FC<DataGridProps> = ({ headers, onShow, fetchFn }) => {
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
    state,
    togglePartialList,
    toggleList,
    selectedIds,
  } = useSelectionItems(list, currentList);
  const { subscribe, getIsSubscribed } = useContext(SubscriptionContext);
  const selectedItemsCount = selectedIds.length;

  const handleShow = () => {
    onShow(selectedIds.map((v) => +v));
  };

  const handleRowClick = (id: number) => {
    onShow([+id]);
    subscribe('sport', id.toString());
  };

  return (
    <div>
      <Toolbar
        onShowAllClick={handleShow}
        onSelectAllClick={toggleList}
        selectionState={state}
        selectedItemsCount={selectedItemsCount}
      />
      <Paper>
        <Table
          list={currentList}
          headers={headers}
          isLoading={isLoading}
          selectionState={partialState}
          onRowCheck={toggle}
          onAggregatedCheckboxClick={togglePartialList}
          onRowClick={handleRowClick}
          getIsRowChecked={(id) => getIsSelected(+id)}
          getIsRowSelected={(id) => getIsSelected(+id)}
          getIsRowSubscribed={(id) => getIsSubscribed('sport', id)}
        />
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
