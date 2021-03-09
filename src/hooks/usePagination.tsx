import { useCallback, useEffect, useMemo, useState } from 'react';

export interface UsePaginationFetchResult<T> {
  partialList: T[];
  hasMore: boolean;
}

export interface UsePaginationFetchArgs {
  start: number;
  end: number;
}

export type UsePaginationFetchFn<T> = (args: {
  start: number;
  end: number;
}) => Promise<UsePaginationFetchResult<T>>;

export interface UserPaginationOptions<T> {
  fetchFn: UsePaginationFetchFn<T>;
  perPage?: number;
}

export const usePagination = <T extends unknown>({
  fetchFn,
  perPage = 10,
}: UserPaginationOptions<T>) => {
  // sessionId will trigger fetch (on reset)
  const [sessionId, setSessionId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [aggregatedList, setAggregatedList] = useState<T[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const list = useMemo(
    () =>
      aggregatedList.reduce((acc, partialList) => [...acc, ...partialList], []),
    [aggregatedList]
  );

  const totalPages = aggregatedList.length;
  const hasNext = !isLoading && (currentPage + 1 < totalPages || hasMore);
  const hasPrev = !isLoading && currentPage > 0;
  const currentList = aggregatedList[currentPage];
  // this should be used internally only
  const goToPage = useCallback(
    (destPage: number) => {
      if (!aggregatedList[destPage]) {
        setIsLoading(true);
      }
      setCurrentPage(destPage);
    },
    [aggregatedList]
  );

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const reset = useCallback(() => {
    setIsLoading(true);
    setHasMore(false);
    setCurrentPage(0);
    setAggregatedList([]);
    setSessionId((prevSessionId) => prevSessionId + 1);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    let isMounted = true;
    const start = currentPage * perPage;
    const end = (currentPage + 1) * perPage;

    fetchFn({ start, end }).then((result) => {
      if (!isMounted) {
        return;
      }
      setAggregatedList((prevAggregatedList) => {
        const newAggregateList = [...prevAggregatedList];
        newAggregateList[currentPage] = result.partialList;

        return newAggregateList;
      });
      setHasMore(result.hasMore);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // by design fetchFn and perPage are not part of dep list
    // it could lead to unexpected behavior
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLoading, sessionId]);

  return useMemo(
    () => ({
      hasNext,
      hasPrev,
      goToNextPage,
      goToPrevPage,
      reset,
      currentList: currentList || [],
      isLoading,
      list,
    }),
    [
      goToNextPage,
      goToPrevPage,
      hasNext,
      hasPrev,
      reset,
      currentList,
      list,
      isLoading,
    ]
  );
};
