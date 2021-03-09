export type SelectedState = 'selected' | 'unselected' | 'indeterminate';
export type SortedState = 'asc' | 'desc';
export type DataType = 'date' | 'string' | 'number';
export interface BaseEntity {
  id: number;
}
export interface SortedField {
  state?: SortedState;
  key: string;
}
