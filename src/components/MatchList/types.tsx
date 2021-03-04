export interface MatchListField {
  title: string;
  key: string;
  type?: 'date';
}

export interface MatchListEntry extends Record<string, any> {
  id: string | number;
}
