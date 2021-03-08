import { TableCell, TableRow } from '@material-ui/core';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { CheckboxCell } from './CheckboxCell';
import { DataGridRow as DataGridRowType } from './types';

const StyledTableRow = styled(TableRow)({
  cursor: 'pointer',
});

export interface RowProps extends DataGridRowType {
  onClick: () => void;
  onCheck: () => void;
  isChecked: boolean;
  isSubscribed: boolean;
}

export const Row: FC<RowProps> = ({
  cells,
  onClick,
  onCheck,
  isChecked,
  isSubscribed,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  console.log(isHovering);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <StyledTableRow
      onClick={onClick}
      selected={isSubscribed}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CheckboxCell
        onClick={onCheck}
        state={isChecked ? 'selected' : 'unselected'}
      />
      {cells.map((text, index) => (
        <TableCell key={index}>{text}</TableCell>
      ))}
    </StyledTableRow>
  );
};
