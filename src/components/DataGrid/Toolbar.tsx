import styled from 'styled-components';
import { FC } from 'react';
import { Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { SelectAllButton } from './SelectAllButton';
import { SelectionState } from '../../types';

interface ContainerProps {
  isVisible: boolean;
}

const Container = styled.div<ContainerProps>(({ isVisible }) => ({
  visibility: isVisible ? 'hidden' : undefined,
  textAlign: 'right',
}));

export interface ToolbarProps {
  selectionState: SelectionState;
  selectedItemsCount: number;
  onSelectAllClick: () => void;
  onShowAllClick: () => void;
  isVisible: boolean;
}
export const Toolbar: FC<ToolbarProps> = ({
  selectedItemsCount,
  selectionState,
  onSelectAllClick,
  onShowAllClick,
  isVisible,
}) => (
  <Container isVisible={isVisible}>
    <SelectAllButton
      selectedItemsCount={selectedItemsCount}
      state={selectionState}
      onClick={onSelectAllClick}
    />
    <Button
      disabled={selectedItemsCount === 0}
      onClick={onShowAllClick}
      variant="text"
      color="default"
      startIcon={<Visibility />}
    >
      Show all
    </Button>
  </Container>
);
