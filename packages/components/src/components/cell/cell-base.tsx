import { View } from '@tarojs/components';
import { RightOutlined } from '@heathen/icons';
import useCreation from 'ahooks/es/useCreation';
import clsx from 'clsx';
import { useContext } from 'react';
import CellGroupContext from './cell-group.context';
import { CellBaseProps } from './cell.shared';

function CellBase(props: CellBaseProps) {
  const {
    className,
    size = 'medium',
    align,
    clickable: clickableProp = false,
    required = false,
    bordered = true,
    isLink = false,
    children,
    rightIcon,
    ...restProps
  } = props;

  const { clickable } = useContext(CellGroupContext);
  const cellClickable = isLink || clickable || clickableProp;

  const rightIconRender = useCreation(() => {
    if (rightIcon) {
      return rightIcon;
    } else {
      if (isLink) {
        return <RightOutlined className='heathen-cell__right-icon' />;
      }
    }

    return null;
  }, [rightIcon]);

  return (
    <View
      className={clsx(
        'heathen-cell',
        {
          ['heathen-cell--start']: align === 'start',
          ['heathen-cell--center']: align === 'center',
          ['heathen-cell--end']: align === 'end',
          ['heathen-cell--large']: size === 'large',
          ['heathen-cell--clickable']: cellClickable,
          ['heathen-cell--required']: required,
          ['heathen-cell--borderless']: !bordered,
        },
        className,
      )}
      {...restProps}
    >
      {children}
      {rightIconRender}
    </View>
  );
}

export default CellBase;
