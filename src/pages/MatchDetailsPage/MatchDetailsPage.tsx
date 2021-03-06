import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetails, MatchDetailsProps } from '../../components/MatchDetails';
import json from '../../CFEC2.json';

export const MatchDetailsPage: FC = () => {
  const params = useParams<any>();
  const matchId = +params.id;
  const match = json.matches.find(({ id }) => id === matchId)!;
  const matchDetails = json['match-details'].find(
    (a) => a['match-id'] === matchId
  )!;
  const props: MatchDetailsProps = {
    homeTeam: match['home-team'],
    awayTeam: match['away-team'],
    awayFouls: match['away-fouls'],
    homeFouls: match['home-fouls'],
    q1: match.q1,
    q2: match.q2,
    q3: match.q3,
    q4: match.q4,
    mvp: match.MVP,
    date: match.date,
    homeTeamImage: matchDetails['Home-Picture'],
    awayTeamImage: matchDetails['Away-Picture'],
    mvpImage: matchDetails['MVP-Picture'],
    referee: matchDetails.referee,
  };

  return <MatchDetails {...props} />;
};
