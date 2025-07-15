import useUpdate from 'ahooks/es/useUpdate';
import useUpdateLayoutEffect from 'ahooks/es/useUpdateLayoutEffect';
import type { FormInstance } from 'rc-field-form';
import { FieldContext, useWatch } from 'rc-field-form';
import type { NamePath } from 'rc-field-form/es/interface';
import type { FC, ReactNode } from 'react';
import React, { memo, useContext } from 'react';

type RenderChildren<Values = any> = (changedValues: Record<string, any>, form: FormInstance<Values>) => ReactNode;
type ChildrenType<Values = any> = RenderChildren<Values>;

export interface FormSubscribeProps {
  to: NamePath[];
  children: ChildrenType;
}

export const FormSubscribe: FC<FormSubscribeProps> = (props) => {
  const update = useUpdate();
  const form = useContext(FieldContext);

  const value = form.getFieldsValue(props.to);

  // Memo to avoid useless render
  const childNode = React.useMemo(() => {
    return props.children(value, form);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(value), props.children]);

  return (
    <>
      {childNode}
      {props.to.map((namePath) => (
        <Watcher key={namePath.toString()} form={form} namePath={namePath} onChange={update} />
      ))}
    </>
  );
};

export const Watcher = memo<{
  form: FormInstance;
  namePath: NamePath;
  onChange: () => void;
}>((props) => {
  const value = useWatch(props.namePath, props.form);
  useUpdateLayoutEffect(() => {
    props.onChange();
  }, [value]);
  return null;
});
