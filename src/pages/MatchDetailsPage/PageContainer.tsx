import { Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

const StyledPaper = styled(Paper)({
  minHeight: 860,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Header = styled(Typography)({
  textTransform: 'capitalize',
  marginBottom: 15,
});

export const PageContainer: FC = ({ children }) => (
  <>
    <Header variant="h4">Match details</Header>
    <StyledPaper>{children}</StyledPaper>
  </>
);
