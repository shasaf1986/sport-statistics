import { FC } from 'react';
import { Badge, Button } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  IndeterminateCheckBox,
} from '@material-ui/icons';
import { SelectedState } from '../../types';

const getIcon = (state: SelectedState) => {
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
  state: SelectedState;
  onClick: () => void;
  selectedItemsCount: number;
  isDisabled: boolean;
}

export const SelectAllButton: FC<SelectAllButtonProps> = ({
  onClick,
  selectedItemsCount,
  state,
  isDisabled,
}) => {
  const Icon = getIcon(state);

  return (
    <Badge
      badgeContent={selectedItemsCount}
      overlap="rectangle"
      color="primary"
    >
      <Button
        disabled={isDisabled}
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
