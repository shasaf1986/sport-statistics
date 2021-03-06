import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { MatchHeader } from './MatchHeader';
import { BackgroundImage } from '../../components/BackgroundImage';

const MvpImage = styled(BackgroundImage)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top',
});

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
  width: 500,
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
  // date,
  mvp,
  mvpImage,
  referee,
}) => (
  <Container>
    <MatchHeader
      finalResult={q4}
      homeTeam={homeTeam}
      homeTeamImage={homeTeamImage}
      awayTeam={awayTeam}
      awayTeamImage={awayTeamImage}
    />
    <List>
      <ListItem>
        <ListItemText primary="Q1 score" secondary={q1} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Q2 score" secondary={q2} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Q3 score" secondary={q3} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Q4 score" secondary={q4} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Home fouls" secondary={homeFouls} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Away fouls" secondary={awayFouls} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Referee" secondary={referee} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MvpImage src={mvpImage} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="MVP" secondary={mvp} />
      </ListItem>
    </List>
  </Container>
);
