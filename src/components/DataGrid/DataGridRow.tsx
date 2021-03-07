import { TableCell, TableRow } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CheckboxCell } from './CheckboxCell';
import { DataGridRow as DataGridRowType } from './types';

export interface DataGridRowProps extends DataGridRowType {
  onClick: () => void;
  onCheck: () => void;
  isChecked: boolean;
}

export const DataGridRow: FC<DataGridRowProps> = ({
  cells,
  onClick,
  onCheck,
  isChecked,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleClick = () => {
    onClick();
  };

  return (
    <TableRow
      onClick={handleClick}
      selected={isHovering}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      <CheckboxCell
        onClick={onCheck}
        state={isChecked ? 'selected' : 'unselected'}
      />
      {cells.map((text, index) => (
        <TableCell key={index}>{text}</TableCell>
      ))}
    </TableRow>
  );
};
