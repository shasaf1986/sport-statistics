import { FC } from 'react';
import {
  AppBar as BaseAppBar,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';
import companyLogo from './assets/logo.png';
import { BackgroundImage } from '../BackgroundImage';
import styeld from 'styled-components';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/styles';

const Logo = styeld(BackgroundImage)({
  height: 64,
  width: 64,
  marginRight: 15,
  cursor: 'pointer',
});

const StyledToolbar = styled(Toolbar)({
  padding: 0,
  cursor: 'pointer',
  userSelect: 'none',
});

export const NavBar: FC = () => {
  const history = useHistory();

  const navigateToHomePage = () => {
    history.push('/');
  };

  return (
    <BaseAppBar color="default" position="static">
      <Container>
        <StyledToolbar>
          <Logo onClick={navigateToHomePage} src={companyLogo} />
          <Typography onClick={navigateToHomePage} variant="h6">
            Basketball
          </Typography>
        </StyledToolbar>
      </Container>
    </BaseAppBar>
  );
};
