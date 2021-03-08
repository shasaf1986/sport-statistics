import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: 500,
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const DrawerContainer: FC = ({ children }) => (
  <>
    <Container> {children}</Container>
  </>
);
