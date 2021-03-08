import { Paper } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

const StyledPaper = styled(Paper)({
  minHeight: 860,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const PageContainer: FC = ({ children }) => (
  <StyledPaper>{children}</StyledPaper>
);
