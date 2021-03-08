import { IconButton } from '@material-ui/core';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons';
import { FC } from 'react';

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => (
  <div
    style={{
      textAlign: 'right',
    }}
  >
    <IconButton disabled={!hasPrev} onClick={onPrev}>
      <NavigateBeforeIcon />
    </IconButton>
    <IconButton disabled={!hasNext} onClick={onNext}>
      <NavigateNextIcon />
    </IconButton>
  </div>
);
