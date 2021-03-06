import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React, { FC, ReactNode, useState } from 'react';

export interface DataGridRowProps {
  id: string | number;
  cells: ReactNode[];
}

export const DataGridRow: FC<DataGridRowProps> = ({ cells }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <TableRow
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
          visibility: isHovering ? undefined : 'hidden',
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
