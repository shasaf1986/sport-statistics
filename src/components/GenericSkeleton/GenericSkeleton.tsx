import { FC } from 'react';
import { Skeleton } from '@material-ui/lab';

export const GenericSkeleton: FC = () => (
  <div>
    {Array.from({ length: 20 }, (_, index) => (
      <Skeleton key={index} />
    ))}
  </div>
);
