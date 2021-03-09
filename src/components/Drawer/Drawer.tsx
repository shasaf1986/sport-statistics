import { Drawer as MuiDrawer } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ExitAnimationDetector } from './ExitAnimationDetector';

export const Drawer: FC = ({ children }) => {
  const isMountedRef = useRef(false);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    setIsOpen(true);

    return () => {
      isMountedRef.current = false;
    };
  }, []);
  // in order to go back when the animation of drawer is ended
  // otherwise this component will be unmounted immediately
  const handleAnimationEnd = () => {
    if (isMountedRef.current) {
      history.goBack();
    }
  };

  return (
    <MuiDrawer
      open={isOpen}
      anchor="right"
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <ExitAnimationDetector onAnimationEnd={handleAnimationEnd} />
      {children}
    </MuiDrawer>
  );
};
