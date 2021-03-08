import { FC, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { MatchDetails, MatchDetailsProps } from '../../components/MatchDetails';
import { Pagination } from '../../components/Pagination';
import { usePagination, UsePaginationFetchFn } from '../../hooks/usePagination';
import { sportApi } from '../../api/sport';
import { DrawerContainer } from './DrawerContainer';
import { PageContainer } from './PageContainer';

export const MatchDetailsPage: FC = () => {
  const { id: paramId } = useParams<any>();
  const location = useLocation<any>();
  const ids: number[] = useMemo(
    () => paramId.split('-').map((id: any) => +id),
    [paramId]
  );
  const isModal = location.state?.isModal === true;
  console.log(isModal);

  const fetchFn: UsePaginationFetchFn<MatchDetailsProps> = async ({
    start,
    end,
  }) => {
    const { hasMore, result: partialList } = await sportApi.fetchMatchDetails(
      ids,
      start,
      end
    );
    return {
      hasMore,
      partialList,
    };
  };

  const {
    currentList,
    isLoading,
    hasNext,
    hasPrev,
    goToNextPage,
    goToPrevPage,
  } = usePagination({
    fetchFn,
    perPage: 1,
  });

  const ParentContainer = isModal ? DrawerContainer : PageContainer;

  return (
    <ParentContainer>
      <div
        style={{
          padding: 5,
        }}
      >
        {isLoading &&
          Array.from({ length: 20 }, (_, index) => <Skeleton key={index} />)}
        {!isLoading && (
          <div>
            <MatchDetails {...currentList[0]} />
          </div>
        )}
      </div>
      <Pagination
        hasNext={hasNext}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
        hasPrev={hasPrev}
      />
    </ParentContainer>
  );
};
