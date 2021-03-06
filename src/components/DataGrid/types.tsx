import { ReactNode } from 'react';

export interface DataGridRow {
  id: string | number;
  cells: ReactNode[];
}

export interface DataGridHeader {
  node: ReactNode;
}
