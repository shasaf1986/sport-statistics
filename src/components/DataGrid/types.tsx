import { DataType } from '../../types';
import { UsePaginationFetchFn } from '../../hooks/usePagination';

export type DataGridConfig = {
  textHeader: string;
  key: string;
  dataType?: DataType;
}[];

export type DataGridFetchFn<T = any> = UsePaginationFetchFn<T>;
