import { FC, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { MatchListPage } from '../pages/MatchListPage';
import { MatchDetailsPage } from '../pages/MatchDetailsPage';
import { Drawer } from '../components/Drawer/Drawer';

export const Routes: FC = () => {
  const location = useLocation<any>();
  const prevLocationRef = useRef(location);
  const isModal = location.state?.isModal === true;
  console.log('here');
  if (!isModal) {
    prevLocationRef.current = location;
  }
  console.log(location);
  console.log(isModal);

  return (
    <>
      <Switch location={isModal ? prevLocationRef.current : location}>
        <Route exact path="/">
          <MatchListPage />
        </Route>
      </Switch>
      {isModal && (
        <Route exact path="/match-details/:id">
          <Drawer>
            <MatchDetailsPage />
          </Drawer>
        </Route>
      )}
    </>
  );
};
