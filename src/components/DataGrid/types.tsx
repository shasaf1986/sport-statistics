import { ReactNode } from 'react';

export interface DataGridRow {
  id: number;
  cells: ReactNode[];
}

export interface DataGridHeader {
  node: ReactNode;
}
