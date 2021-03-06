import { Drawer } from '@material-ui/core';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MatchListPage } from '../pages/MatchListPage';
import { MatchDetailsPage } from '../pages/MatchDetailsPage';

export const Routes: FC = () => {
  const location = useLocation<any>();
  const prevLocationRef = useRef(location);
  const isModal = location.state?.isModal === true;

  if (!isModal) {
    prevLocationRef.current = location;
  }

  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isModal) {
      setIsOpen(true);
    }
  }, [isModal]);

  return (
    <>
      <Switch location={isModal ? prevLocationRef.current : location}>
        <Route exact path="/">
          <MatchListPage />
        </Route>
      </Switch>
      <Route exact path="/match-details/:id">
        <Drawer
          open={isOpen}
          anchor="right"
          onClose={() => {
            setIsOpen(false);
            history.goBack();
            console.log('here');
          }}
        >
          <MatchDetailsPage />
        </Drawer>
      </Route>
    </>
  );
};
