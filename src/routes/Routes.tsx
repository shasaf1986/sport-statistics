import { FC, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { MatchListPage } from '../pages/MatchListPage';
import { Drawer } from '../components/Drawer/Drawer';
import { routeConfigs } from './routeConfigs';

export interface RoutesProps {
  layout: FC;
}

export const Routes: FC<RoutesProps> = ({ layout: Layout }) => {
  const location = useLocation<any>();
  const prevLocationRef = useRef(location);
  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    // this a hack
    // somehow the browser preserves the state after refresh, unlike copy to a new tab
    delete location.state;
    isFirstRenderRef.current = false;
  }
  // or a drawer in our case
  const isModal = location.state?.isModal === true;
  if (!isModal) {
    prevLocationRef.current = location;
  }
  const primaryLocation = isModal ? prevLocationRef.current : location;

  return (
    <Route location={primaryLocation}>
      <Layout>
        <Switch location={primaryLocation}>
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
              <Route location={location} key={index} {...routeProps}>
                <Drawer>{children}</Drawer>
              </Route>
            ))}
      </Layout>
    </Route>
  );
};
