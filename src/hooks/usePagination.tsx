import { useEffect, useState } from 'react';

export interface UsePaginationFetchResult<T> {
  list: T[];
  hasMore: boolean;
}

export type UsePaginationFetchFn<T> = (
  page: number
) => Promise<UsePaginationFetchResult<T>>;

export const usePagination = <T extends unknown>(
  fetchFn: UsePaginationFetchFn<T>
) => {
  const [aggregateList, setAggregateList] = useState<T[][]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const currentList: T[] | undefined = aggregateList[currentPage];
  const [isLoading, setIsLoading] = useState(true);
  const hasNext =
    !isLoading && (currentPage + 1 < aggregateList.length || hasMore);
  const hasPrev = !isLoading && currentPage > 0;

  const triggerChangePage = (newPage: number) => {
    if (!aggregateList[newPage]) {
      setIsLoading(true);
    }
    setCurrentPage(newPage);
  };
  const triggerNextPage = () => {
    triggerChangePage(currentPage + 1);
  };
  const triggerPrevPage = () => {
    triggerChangePage(currentPage - 1);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    let isMounted = true;

    fetchFn(currentPage).then((result) => {
      if (!isMounted) {
        return;
      }
      setAggregateList((prev) => {
        const newAggregateList = [...prev];
        newAggregateList[currentPage] = result.list;

        return newAggregateList;
      });
      setHasMore(result.hasMore);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [currentPage, isLoading]);

  return {
    isLoading,
    currentList,
    triggerNextPage,
    triggerPrevPage,
    hasNext,
    hasPrev,
  };
};
