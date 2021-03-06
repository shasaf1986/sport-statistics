import React, { FC, useEffect } from 'react';

export const Dummy: FC = () => {
  useEffect(
    () =>
      // console.log('unmounted');
      () => {
        console.log('unmounted');
      },
    []
  );

  return <div>dummy</div>;
};
