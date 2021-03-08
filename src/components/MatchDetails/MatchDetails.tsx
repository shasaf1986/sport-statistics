import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';
import { MatchHeader } from './MatchHeader';
import { BackgroundImage } from '../../components/BackgroundImage';
import { getFormattedText } from '../../utils/textFormat';

const MvpImage = styled(BackgroundImage)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top',
});

const StyledListItem = styled(ListItem).attrs({
  button: true,
})({
  textAlign: 'center',
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
      <StyledListItem button>
        <ListItemText
          primary="Date"
          secondary={getFormattedText(date, 'date')}
        />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Q1 score" secondary={q1} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Q2 score" secondary={q2} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Q3 score" secondary={q3} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Q4 score" secondary={q4} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Home fouls" secondary={homeFouls} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Away fouls" secondary={awayFouls} />
      </StyledListItem>
      <StyledListItem>
        <ListItemText primary="Referee" secondary={referee} />
      </StyledListItem>
      <StyledListItem>
        <ListItemAvatar>
          <Avatar>
            <MvpImage src={mvpImage} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="MVP" secondary={mvp} />
      </StyledListItem>
    </List>
  </Container>
);
