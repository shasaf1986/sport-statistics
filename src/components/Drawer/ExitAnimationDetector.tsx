import { FC, useEffect } from 'react';

export interface ExitAnimationDetectorProps {
  onAnimationEnd: () => void;
}

export const ExitAnimationDetector: FC<ExitAnimationDetectorProps> = ({
  onAnimationEnd,
}) => {
  useEffect(
    () => () => {
      onAnimationEnd();
    },
    []
  );

  return null;
};
