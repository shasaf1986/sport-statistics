import { FC } from 'react';
import { Badge, Button } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  IndeterminateCheckBox,
} from '@material-ui/icons';
import { SelectionState } from '../../types';

const getIcon = (state: SelectionState) => {
  switch (state) {
    case 'selected': {
      return CheckBox;
    }
    case 'unselected': {
      return CheckBoxOutlineBlankOutlined;
    }
    default: {
      return IndeterminateCheckBox;
    }
  }
};

interface SelectAllButtonProps {
  state: SelectionState;
  onClick: () => void;
  selectedItemsCount: number;
}

export const SelectAllButton: FC<SelectAllButtonProps> = ({
  onClick,
  selectedItemsCount,
  state,
}) => {
  const Icon = getIcon(state);

  return (
    <Badge
      badgeContent={selectedItemsCount}
      overlap="rectangle"
      color="primary"
    >
      <Button
        onClick={onClick}
        variant="text"
        color="default"
        startIcon={<Icon />}
      >
        Select all
      </Button>
    </Badge>
  );
};
