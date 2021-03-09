import { FC, useEffect } from 'react';

export interface ExitAnimationDetectorProps {
  onAnimationEnd: () => void;
}
// this is a hack: mui drawer does not provide an animation end callback
export const ExitAnimationDetector: FC<ExitAnimationDetectorProps> = ({
  onAnimationEnd,
}) => {
  useEffect(
    () => () => {
      // will unmount
      onAnimationEnd();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};
