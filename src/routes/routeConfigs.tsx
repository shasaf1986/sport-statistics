import { RouteProps } from 'react-router-dom';
import { MatchListPage } from '../pages/MatchListPage';
import { WelcomePage } from '../pages/WelcomePage';
import { MatchDetailsPage } from '../pages/MatchDetailsPage';

export interface RouteConfig extends RouteProps {
  canBeModal?: boolean;
}

export const routeConfigs: RouteConfig[] = [
  {
    exact: true,
    path: '/',
    children: <WelcomePage />,
  },
  {
    exact: true,
    path: '/match-list',
    children: <MatchListPage />,
  },
  {
    path: '/match-details/:id',
    exact: true,
    canBeModal: true,
    children: <MatchDetailsPage />,
  },
];
