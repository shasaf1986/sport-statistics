import {
  Checkbox as MuiCheckbox,
  TableCell as MuiTableCell,
} from '@material-ui/core';
import { IndeterminateCheckBox as IndeterminateCheckBoxIcon } from '@material-ui/icons';
import styled from 'styled-components';
import { FC } from 'react';
import { SelectedState } from '../../types';

interface ContainerProps {
  isVisible: boolean;
}

const Container = styled(MuiTableCell).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['hidden'].includes(prop) && defaultValidatorFn(prop),
})<ContainerProps>(({ isVisible }) => ({
  width: 1,
  opacity: isVisible ? 1 : 0,
  paddingRight: 0,
}));

const Checkbox = styled(MuiCheckbox)({
  padding: 0,
});

export interface CheckboxCellProps {
  state?: SelectedState;
  onClick?: () => void;
  isDisabled?: boolean;
  isVisible?: boolean;
}

export const CheckboxCell: FC<CheckboxCellProps> = ({
  state = 'unselected',
  onClick,
  isVisible = true,
  isDisabled = false,
}) => (
  <Container
    isVisible={isVisible}
    onClick={(event) => {
      if (isVisible && !isDisabled) {
        event.stopPropagation();
        if (onClick) {
          onClick();
        }
      }
    }}
  >
    <Checkbox
      disabled={!isVisible || isDisabled}
      color="primary"
      checked={state === 'selected'}
      indeterminateIcon={<IndeterminateCheckBoxIcon color="primary" />}
      indeterminate={state === 'indeterminate'}
    />
  </Container>
);
