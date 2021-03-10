import { useContext, useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { DataGridConfig, DataGridFetchFn } from './types';
import { usePagination } from '../../hooks/usePagination';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import { Paper } from '@material-ui/core';
import { Table } from './Table';
import { Toolbar } from './Toolbar';
import { useSelectedItems } from '../../hooks/useSelectedItems';
import { BaseEntity, SortedState } from '../../types';
import { UsePaginationFetchArgs } from '../../hooks/usePagination';

export interface DataGridProps<T> {
  config: DataGridConfig;
  fetchFn: DataGridFetchFn<T>;
  onShow: (id: number[]) => void;
  subscriptionKey: string;
}

export const DataGrid = <T extends BaseEntity>({
  onShow,
  fetchFn: innerFechFn,
  subscriptionKey,
  config,
}: DataGridProps<T>) => {
  const [sortedFields, setSortedFields] = useState<Record<string, SortedState>>(
    {}
  );
  const fetchFn = (args: UsePaginationFetchArgs) => {
    const sortBy = Object.keys(sortedFields).map((key) => ({
      key,
      state: sortedFields[key],
    }));
    return innerFechFn({
      ...args,
      sortBy,
    });
  };
  const {
    currentList,
    hasNext,
    goToNextPage,
    goToPrevPage,
    hasPrev,
    isLoading,
    list,
    reset: resetPagination,
  } = usePagination({ fetchFn });
  const {
    getIsSelected,
    toggle,
    partialState,
    state,
    togglePartialList,
    toggleList,
    selectedIds,
    reset: resetSelectedItems,
  } = useSelectedItems(list, currentList);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const { subscribe, getIsSubscribed } = useContext(SubscriptionContext);
  const selectedItemsCount = selectedIds.length;

  const handleShow = (ids: number[]) => {
    subscribe(subscriptionKey, ids);
    onShow(ids);
  };
  const handleShowAll = () => {
    handleShow(selectedIds);
  };
  const handleRowClick = (id: number) => {
    handleShow([id]);
  };
  const handleSortChange = (key: string) => {
    resetPagination();
    resetSelectedItems();
    setSortedFields((prevSortedField) => ({
      ...prevSortedField,
      [key]: prevSortedField[key] === 'asc' ? 'desc' : 'asc',
    }));
  };

  useEffect(() => {
    // it keeps the checkboxes open for the first time
    // when there is at least one selected item
    // using selectedItemsCount only will lead to weird behaviors
    if (selectedItemsCount > 0) {
      setShowCheckboxes(true);
    }
  }, [selectedItemsCount]);

  return (
    <div>
      <Toolbar
        totalItemsCount={list.length}
        isVisible={!showCheckboxes}
        onShowAllClick={handleShowAll}
        onSelectAllClick={toggleList}
        selectedState={state}
        selectedItemsCount={selectedItemsCount}
      />
      <Paper>
        <Table
          sortedFields={sortedFields}
          onSortChange={handleSortChange}
          showCheckboxes={showCheckboxes}
          list={currentList}
          config={config}
          isLoading={isLoading}
          selectedState={partialState}
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
