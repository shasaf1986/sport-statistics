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

const CompanyImage = styeld(BackgroundImage)({
  height: 64,
  width: 64,
  marginRight: 15,
  cursor: 'pointer',
});

export const AppBar: FC = () => {
  const history = useHistory();

  const navigateToHomePage = () => {
    history.push('/');
  };

  return (
    <BaseAppBar color="default" position="static">
      <Container>
        <Toolbar
          style={{
            padding: 0,
          }}
        >
          <CompanyImage onClick={navigateToHomePage} src={companyLogo} />
          <Typography variant="h6">Basketball</Typography>
        </Toolbar>
      </Container>
    </BaseAppBar>
  );
};
