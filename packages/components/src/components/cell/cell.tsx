import { ReactNode } from 'react';
import CellBase from './cell-base';
import CellBrief from './cell-brief';
import CellTitle from './cell-title';
import CellValue from './cell-value';
import { CellBaseProps } from './cell.shared';

export interface CellProps extends CellBaseProps {
  title?: ReactNode;
  brief?: ReactNode;
}

export const Cell: React.FC<CellProps> = (props) => {
  const { title, brief, children, ...restProps } = props;
  return (
    <CellBase {...restProps}>
      {title ? (
        <CellTitle>
          {title}
          {brief ? <CellBrief>{brief}</CellBrief> : null}
        </CellTitle>
      ) : null}
      <CellValue alone={!title}>{children}</CellValue>
    </CellBase>
  );
};
