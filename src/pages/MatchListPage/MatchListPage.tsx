import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { sportApi } from '../../api/sport';
import {
  DataGrid,
  DataGridHeader,
  DataGridFetchFn,
} from '../../components/DataGrid';
import { fieldConfig } from './fieldsConfig';

const headers: DataGridHeader[] = fieldConfig.map(({ title }) => ({
  node: title,
}));

const fetchFn: DataGridFetchFn = async ({ start, end }) => {
  const { hasMore, result } = await sportApi.fetchMatchList(start, end);
  return {
    hasMore,
    partialList: result.map(({ id, ...rest }) => ({
      id,
      cells: fieldConfig.map(({ key }) => (rest as any)[key]),
    })),
  };
};

export const MatchListPage: FC = () => {
  const history = useHistory();
  const handleShow = (id: number[]) => {
    history.push(`/match-details/${id.join('-')}`, { isModal: true });
  };

  return <DataGrid onShow={handleShow} fetchFn={fetchFn} headers={headers} />;
};
