import { FC, useRef } from 'react';
import { Switch, Route, useLocation, RouteProps } from 'react-router-dom';
import { MatchListPage } from '../pages/MatchListPage';
import { MatchDetailsPage } from '../pages/MatchDetailsPage';
import { Drawer } from '../components/Drawer/Drawer';

interface RouteConfig extends RouteProps {
  canBeModal?: boolean;
}
const routeConfigs: RouteConfig[] = [
  {
    exact: true,
    path: '/',
    children: <MatchListPage />,
  },
  {
    path: '/match-details/:id',
    exact: true,
    canBeModal: true,
    children: <MatchDetailsPage />,
  },
];

export const Routes: FC = () => {
  const location = useLocation<any>();
  const prevLocationRef = useRef(location);
  const isFirstTimeRef = useRef(true);
  if (isFirstTimeRef.current) {
    delete location.state;
    isFirstTimeRef.current = false;
  }

  const isModal = location.state?.isModal === true;
  if (!isModal) {
    prevLocationRef.current = location;
  }
  console.log(location.state);
  console.log(isModal);
  // console.log(location);
  // console.log(isModal);

  return (
    <>
      <Switch location={isModal ? prevLocationRef.current : location}>
        {routeConfigs.map(
          (
            {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              canBeModal,
              ...routeProps
            },
            index
          ) => (
            <Route key={index} {...routeProps} />
          )
        )}
        <Route exact path="/">
          <MatchListPage />
        </Route>
      </Switch>
      {isModal &&
        routeConfigs
          .filter(({ canBeModal }) => canBeModal)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ canBeModal, children, ...routeProps }, index) => (
            <Route key={index} {...routeProps}>
              <Drawer>{children}</Drawer>
            </Route>
          ))}
    </>
  );
};
