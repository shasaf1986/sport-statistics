import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { DataGridRow as DataGridRowType } from './types';

export interface DataGridRowProps extends DataGridRowType {
  onClick: (id: string | number) => void;
}

export const DataGridRow: FC<DataGridRowProps> = ({ cells, id, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleClick = () => {
    onClick(id);
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
      <TableCell
        style={{
          // opacity: isHovering ? 1 : 0,
          // visibility: isHovering ? undefined : 'hidden',
          // borderColor: isHovering ? undefined : 'transparent',
          paddingRight: 0,
          width: 1,
        }}
      >
        <Checkbox
          style={{
            // visibility: isHovering ? undefined : 'hidden',
            padding: 0,
          }}
          color="primary"
        />
      </TableCell>
      {cells.map((text, index) => (
        <TableCell key={index}>{text}</TableCell>
      ))}
    </TableRow>
  );
};
