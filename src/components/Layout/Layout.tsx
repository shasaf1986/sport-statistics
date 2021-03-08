import { FC } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { AppBar } from '../AppBar';

const PageContainer = styled(Container)({
  marginTop: 15,
  marginBottom: 15,
});

export const Layout: FC = ({ children }) => (
  <>
    <AppBar />
    <PageContainer>
      <>{children}</>
    </PageContainer>
  </>
);
