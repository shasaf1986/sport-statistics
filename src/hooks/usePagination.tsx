import { useEffect, useState } from 'react';

export const usePagination = <T extends unknown>(
  fetchFn: (currentPage: number) => Promise<T[]>
) => {
  const [aggregateList, setAggregateList] = useState<T[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const currentList: T[] | undefined = aggregateList[currentPage];
  const [isLoading, setIsLoading] = useState(true);

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

    fetchFn(currentPage).then((newList) => {
      if (!isMounted) {
        return;
      }
      setAggregateList((prev) => {
        const newAggregateList = [...prev];
        newAggregateList[currentPage] = newList;

        return newAggregateList;
      });
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
  };
};
