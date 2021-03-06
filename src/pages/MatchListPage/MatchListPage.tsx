import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { sportApi } from '../../api/sport';
import { DataGrid, DataGridFetchFn } from '../../components/DataGrid';
import { gridConfig } from './gridConfig';

const fetchFn: DataGridFetchFn = async ({ start, end, sortBy }) => {
  const { hasMore, result } = await sportApi.fetchMatchList(start, end, sortBy);
  return {
    hasMore,
    partialList: result,
  };
};

export const MatchListPage: FC = () => {
  const history = useHistory();
  const handleShow = (id: number[]) => {
    history.push(`/match-details/${id.join('-')}`, { isModal: true });
  };

  return (
    <DataGrid
      onShow={handleShow}
      subscriptionKey="matchList"
      fetchFn={fetchFn}
      config={gridConfig}
    />
  );
};
