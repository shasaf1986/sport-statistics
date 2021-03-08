export type SelectionState = 'selected' | 'unselected' | 'indeterminate';
export type SortingState = 'asc' | 'desc';
export type DataType = 'date' | 'string' | 'number';
export interface BaseEntity {
  id: number;
}
