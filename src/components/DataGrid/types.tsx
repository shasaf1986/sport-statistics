import { DataType, SortedField } from '../../types';
import { UsePaginationFetchResult } from '../../hooks/usePagination';

export type DataGridConfig = {
  textHeader: string;
  key: string;
  dataType?: DataType;
}[];

export type DataGridFetchFn<T = any> = (args: {
  start: number;
  end: number;
  sortBy: SortedField[];
}) => Promise<UsePaginationFetchResult<T>>;
