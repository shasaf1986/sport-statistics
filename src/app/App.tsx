import { FC } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../routes';
import { Layout } from '../components/Layout';
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { SubscriptionProvider } from '../contexts/SubscriptionContext';

export const App: FC = () => (
  <BrowserRouter>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledThemeProvider theme={theme}>
          <SubscriptionProvider>
            <BrowserRouter>
              <Routes layout={Layout} />
            </BrowserRouter>
          </SubscriptionProvider>
        </StyledThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>
);
