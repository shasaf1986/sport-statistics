import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { MatchListEntry, MatchListField } from './types';
import { getFormattedText } from '../../utils/textFormat';

interface EntryProps {
  entry: MatchListEntry;
  fields: MatchListField[];
}

export const Entry: FC<EntryProps> = ({ entry, fields }) => {
  const cells = useMemo(() => fields.map(({ key, type }) => {
    return (
      <TableCell key={key}>{getFormattedText(entry[key], type)}</TableCell>
    );
  }), [entry, fields]);

  return (
    <TableRow
      key={entry.id}>
      <TableCell
        style={{
          width: 1
        }}
      >
        <Checkbox color="primary"
        />
      </TableCell>
      {cells}
    </TableRow>
  );
};