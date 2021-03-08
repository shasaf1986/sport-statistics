import { FC, useContext } from 'react';
import { Pagination } from '../Pagination';
import { DataGridFetchFn, DataGridHeader } from './types';
import { usePagination } from '../../hooks/usePagination';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import { Paper } from '@material-ui/core';
import { Table } from './Table';
import { Toolbar } from './Toolbar';
import { useSelectionItems } from '../../hooks/useSelection';

export interface DataGridProps {
  headers: DataGridHeader[];
  fetchFn: DataGridFetchFn;
  onShow: (id: number[]) => void;
  subscriptionKey?: string;
}

export const DataGrid: FC<DataGridProps> = ({
  headers,
  onShow,
  fetchFn,
  subscriptionKey = 'basketball',
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
    onShow([id]);
    subscribe(subscriptionKey, id);
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
          getIsRowChecked={getIsSelected}
          getIsRowSubscribed={(id) => getIsSubscribed(subscriptionKey, id)}
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
