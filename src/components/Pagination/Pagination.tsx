import { IconButton } from '@material-ui/core';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons';
import styled from 'styled-components';
import { FC } from 'react';

const Container = styled.div({
  textAlign: 'right',
});

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
  <Container>
    <IconButton disabled={!hasPrev} onClick={onPrev}>
      <NavigateBeforeIcon />
    </IconButton>
    <IconButton disabled={!hasNext} onClick={onNext}>
      <NavigateNextIcon />
    </IconButton>
  </Container>
);
