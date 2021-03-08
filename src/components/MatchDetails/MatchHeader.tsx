import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { BackgroundImage } from '../BackgroundImage';

export interface MatchDetailsProps {
  homeTeam: string;
  awayTeam: string;
  finalResult: string;
  homeTeamImage: string;
  awayTeamImage: string;
}

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const TeamContainer = styled.div({
  width: 150,
  textAlign: 'center',
});

const FinalResultContainer = styled.div({
  textAlign: 'center',
  flex: 1,
});

const TeamImage = styled(BackgroundImage)({
  width: 70,
  height: 70,
  margin: '0 auto',
});

export const MatchHeader: FC<MatchDetailsProps> = ({
  homeTeamImage,
  awayTeamImage,
  awayTeam,
  homeTeam,
  finalResult,
}) => (
  <Container>
    <TeamContainer>
      <TeamImage src={homeTeamImage} />
      <Typography variant="subtitle2">{homeTeam}</Typography>
    </TeamContainer>
    <FinalResultContainer>
      <Typography variant="h4">{finalResult.split('-').join(' - ')}</Typography>
    </FinalResultContainer>
    <TeamContainer>
      <TeamImage src={awayTeamImage} />
      <Typography variant="subtitle2">{awayTeam}</Typography>
    </TeamContainer>
  </Container>
);
