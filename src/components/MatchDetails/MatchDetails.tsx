import { List } from '@material-ui/core';
import { ListItemProps, ListItem } from './ListItem';
import { MatchHeader } from './MatchHeader';
import { getFormattedText } from '../../utils/textFormat';
import styled from 'styled-components';
import { FC, useMemo } from 'react';

export interface MatchDetailsProps {
  date: string;
  homeTeam: string;
  awayTeam: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  homeFouls: number;
  awayFouls: number;
  mvp: string;
  mvpImage: string;
  homeTeamImage: string;
  awayTeamImage: string;
  referee: string;
}

const Container = styled.div({
  position: 'relative',
});

export const MatchDetails: FC<MatchDetailsProps> = ({
  homeTeamImage,
  awayTeamImage,
  homeTeam,
  awayTeam,
  q1,
  q2,
  q3,
  q4,
  awayFouls,
  homeFouls,
  date,
  mvp,
  mvpImage,
  referee,
}) => {
  const formattedDate = useMemo(() => getFormattedText(date, 'date'), [date]);
  const items: ListItemProps[] = [
    {
      description: 'Date',
      value: formattedDate,
    },
    {
      description: 'Q1 score',
      value: q1,
    },
    {
      description: 'Q2 score',
      value: q2,
    },
    {
      description: 'Q3 score',
      value: q3,
    },
    {
      description: 'Q4 score',
      value: q4,
    },
    {
      description: 'Home fouls',
      value: homeFouls,
    },
    {
      description: 'Away fouls',
      value: awayFouls,
    },
    {
      description: 'Referee',
      value: referee,
    },
    {
      description: 'MVP',
      value: mvp,
      image: mvpImage,
    },
  ];

  return (
    <Container>
      <MatchHeader
        finalResult={q4}
        homeTeam={homeTeam}
        homeTeamImage={homeTeamImage}
        awayTeam={awayTeam}
        awayTeamImage={awayTeamImage}
      />
      <List>
        {items.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </List>
    </Container>
  );
};
