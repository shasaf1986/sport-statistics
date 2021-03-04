import React from 'react';
import { MatchList, MatchListField } from './components/MatchList';
import { Container } from '@material-ui/core';
import json from './CFEC2.json';

const fields: MatchListField[] = [{
  key: 'date',
  title: 'Date',
  type: 'date'
}, {
  key: 'home-team',
  title: 'Home team'
}, {
  key: 'away-team',
  title: 'Away team'
}, {
  key: 'q1',
  title: 'Q1 score'
},
{
  key: 'q2',
  title: 'Q2 score'
},
{
  key: 'q3',
  title: 'Q3 score'
},
{
  key: 'q4',
  title: 'Q4 score'
},
{
  key: 'home-fouls',
  title: 'Home fouls'
},
{
  key: 'away-fouls',
  title: 'Away fouls'
}, {
  key: 'MVP',
  title: 'MVP'
}
];


export default function BasicTable() {
  console.log(json);

  return (
    <Container fixed>
      <MatchList fields={fields} entries={json['matches']} />
    </Container>
  );
}