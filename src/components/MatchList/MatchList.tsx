import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Entry } from './Entry';
import { MatchListEntry, MatchListField } from './types';

interface MatchListProps {
  fields: MatchListField[];
  entries: MatchListEntry[];
}

export const MatchList: FC<MatchListProps> = ({ entries, fields }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{
              width: 1
            }}  ></TableCell>
            {
              fields.map(({ key, title }) => (
                <TableCell key={key}>{title}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            entries.map((entry) => (
              <Entry entry={entry} fields={fields} key={entry.id} />
            ))
          }

        </TableBody>
      </Table>
    </TableContainer>
  );
};
