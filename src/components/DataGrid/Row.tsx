import { TableCell, TableRow } from '@material-ui/core';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { BaseEntity } from '../../types';
import { getFormattedText } from '../../utils/textFormat';
import { CheckboxCell } from './CheckboxCell';
import { DataGridConfig } from './types';

const StyledTableRow = styled(TableRow)({
  cursor: 'pointer',
});

export interface RowProps<T> {
  config: DataGridConfig;
  data: T;
  onClick: () => void;
  onCheck: () => void;
  isChecked: boolean;
  isSubscribed: boolean;
  showCheckbox: boolean;
}

export const Row = <T extends BaseEntity>({
  onClick,
  onCheck,
  isChecked,
  isSubscribed,
  showCheckbox,
  config,
  data,
}: RowProps<T>) => {
  const [isHovering, setIsHovering] = useState(false);
  const texts = useMemo(
    () =>
      config.map(({ key, dataType }) => {
        const rawValue = (data as any)[key];
        return getFormattedText(rawValue, dataType);
      }),
    [config, data]
  );

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
        isVisible={showCheckbox || isHovering}
        onClick={onCheck}
        state={isChecked ? 'selected' : 'unselected'}
      />
      {config.map((_text, index) => (
        <TableCell key={index}>{texts[index]}</TableCell>
      ))}
    </StyledTableRow>
  );
};
