import styled from 'styled-components';
import { FC } from 'react';
import { Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { SelectAllButton } from './SelectAllButton';
import { SelectedState } from '../../types';

interface ContainerProps {
  isVisible: boolean;
}

const Container = styled.div<ContainerProps>(({ isVisible }) => ({
  visibility: isVisible ? 'hidden' : undefined,
  textAlign: 'right',
}));

export interface ToolbarProps {
  selectedState: SelectedState;
  selectedItemsCount: number;
  totalItemsCount: number;
  onSelectAllClick: () => void;
  onShowAllClick: () => void;
  isVisible: boolean;
}
export const Toolbar: FC<ToolbarProps> = ({
  selectedItemsCount,
  selectedState,
  onSelectAllClick,
  onShowAllClick,
  isVisible,
  totalItemsCount,
}) => (
  <Container isVisible={isVisible}>
    <SelectAllButton
      isDisabled={totalItemsCount === 0}
      selectedItemsCount={selectedItemsCount}
      state={selectedState}
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
