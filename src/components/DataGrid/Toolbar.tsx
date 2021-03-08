import styled from 'styled-components';
import { FC } from 'react';
import { Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { SelectAllButton } from './SelectAllButton';
import { SelectionState } from '../../types';

const Container = styled.div({
  textAlign: 'right',
});

export interface ToolbarProps {
  selectionState: SelectionState;
  selectedItemsCount: number;
  onSelectAllClick: () => void;
  onShowAllClick: () => void;
}
export const Toolbar: FC<ToolbarProps> = ({
  selectedItemsCount,
  selectionState,
  onSelectAllClick,
  onShowAllClick,
}) => (
  <Container>
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
