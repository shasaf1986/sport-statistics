import { FC } from 'react';
import { Container as BaseContainer } from '@material-ui/core';
import styled from 'styled-components';
import { AppBar } from '../AppBar';

const Container = styled(BaseContainer)({
  marginTop: 15,
});

export const Layout: FC = ({ children }) => (
  <>
    <AppBar />
    <Container>
      <>{children}</>
    </Container>
  </>
);
