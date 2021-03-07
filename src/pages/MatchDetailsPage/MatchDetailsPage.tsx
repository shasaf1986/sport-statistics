import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetails, MatchDetailsProps } from '../../components/MatchDetails';
import { Pagination } from '../../components/Pagination';
import { usePagination, UsePaginationFetchFn } from '../../hooks/usePagination';
import { sportApi } from '../../api/sport';
import { Skeleton } from '@material-ui/lab';

export const MatchDetailsPage: FC = () => {
  const { id: paramId } = useParams<any>();
  const ids: number[] = useMemo(
    () => paramId.split('-').map((id: any) => +id),
    [paramId]
  );

  const fetchFn: UsePaginationFetchFn<MatchDetailsProps> = async ({
    start,
    end,
  }) => {
    const response = await sportApi.fetchMatchDetails(ids, start, end);

    const partialList: MatchDetailsProps[] = response.result.map(
      (matchDetails) => ({
        homeTeam: matchDetails['home-team'],
        awayTeam: matchDetails['away-team'],
        awayFouls: matchDetails['away-fouls'],
        homeFouls: matchDetails['home-fouls'],
        q1: matchDetails.q1,
        q2: matchDetails.q2,
        q3: matchDetails.q3,
        q4: matchDetails.q4,
        mvp: matchDetails.MVP,
        date: matchDetails.date,
        homeTeamImage: matchDetails['Home-Picture'],
        awayTeamImage: matchDetails['Away-Picture'],
        mvpImage: matchDetails['MVP-Picture'],
        referee: matchDetails.referee,
      })
    );
    return {
      hasMore: response.hasMore,
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
  console.log(currentList);

  return (
    <div
      style={{
        width: 500,
        minHeight: 700,
      }}
    >
      <div
        style={{
          minHeight: 700,
        }}
      >
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => <Skeleton key={index} />)}
        {currentList[0] && <MatchDetails {...currentList[0]} />}
      </div>
      <Pagination
        hasNext={hasNext}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
        hasPrev={hasPrev}
      />
    </div>
  );
  // return null;

  // const match = json.matches.find(({ id }) => id === matchId)!;
  // const matchDetails = json['match-details'].find(
  //   (a) => a['match-id'] === matchId
  // )!;
  // const props: MatchDetailsProps = {
  //   homeTeam: match['home-team'],
  //   awayTeam: match['away-team'],
  //   awayFouls: match['away-fouls'],
  //   homeFouls: match['home-fouls'],
  //   q1: match.q1,
  //   q2: match.q2,
  //   q3: match.q3,
  //   q4: match.q4,
  //   mvp: match.MVP,
  //   date: match.date,
  //   homeTeamImage: matchDetails['Home-Picture'],
  //   awayTeamImage: matchDetails['Away-Picture'],
  //   mvpImage: matchDetails['MVP-Picture'],
  //   referee: matchDetails.referee,
  // };

  // return <MatchDetails {...props} />;
};
