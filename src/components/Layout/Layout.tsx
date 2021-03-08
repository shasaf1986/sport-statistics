import { FC, useMemo } from 'react';
import { Container, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { AppBar } from '../AppBar';
import { useLocation } from 'react-router-dom';

const PageContainer = styled(Container)({
  marginTop: 15,
  marginBottom: 15,
});

const PageHeader = styled(Typography)({
  textTransform: 'capitalize',
  marginBottom: 15,
});

export const Layout: FC = ({ children }) => {
  const { pathname } = useLocation();
  const pageName = useMemo(
    () => (pathname.split('/')[1] || 'Welcome').split('-').join(' '),
    [pathname]
  );

  return (
    <>
      <AppBar />
      <PageContainer>
        <>
          <PageHeader variant="h4">{pageName}</PageHeader>
          {children}
        </>
      </PageContainer>
    </>
  );
};
