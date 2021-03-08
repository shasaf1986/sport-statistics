import { ReactNode } from 'react';
import {
  UsePaginationFetchArgs,
  UsePaginationFetchResult,
} from '../../hooks/usePagination';

export interface DataGridRow {
  id: number;
  cells: ReactNode[];
}

export interface DataGridHeader {
  node: ReactNode;
}

export interface DataGridFetchFnArgs extends UsePaginationFetchArgs {}
export interface DataGridFetchFnResult
  extends UsePaginationFetchResult<DataGridRow> {}

export type DataGridFetchFn = (
  args: DataGridFetchFnArgs
) => Promise<DataGridFetchFnResult>;
