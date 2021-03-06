import { IconButton } from '@material-ui/core';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons';
import React, { FC } from 'react';

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  // hasNext: boolean;
  // hasPrev: boolean;
}

export const Pagination: FC<PaginationProps> = ({ onNext, onPrev }) => (
  <div
    style={{
      textAlign: 'right',
    }}
  >
    <IconButton onClick={onPrev}>
      <NavigateBeforeIcon />
    </IconButton>
    <IconButton onClick={onNext}>
      <NavigateNextIcon />
    </IconButton>
  </div>
);
