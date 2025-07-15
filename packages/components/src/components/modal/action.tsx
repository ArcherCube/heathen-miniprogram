import useMemoizedFn from 'ahooks/es/useMemoizedFn';
import { useState } from 'react';
import { Button, ButtonProps } from '../button';
import { ModalProps } from './modal';

export type ActionProps = Omit<ButtonProps, 'shape'> & {
  onAction?: () => Promise<unknown> | void;
} & Pick<ModalProps, 'onClose' | 'closeOnAction'>;

export const Action: React.FC<ActionProps> = (props) => {
  const { onAction, onClose, closeOnAction, ...buttonProps } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useMemoizedFn(() => {
    const result = onAction?.();
    if (result) {
      setLoading(true);
      result
        ?.finally(() => {
          setLoading(false);
        })
        .then(() => {
          if (closeOnAction) {
            onClose?.();
          }
        });
    } else {
      if (closeOnAction) {
        onClose?.();
      }
    }
  });

  return <Button variant='text' loading={loading} {...buttonProps} onClick={handleClick} />;
};
