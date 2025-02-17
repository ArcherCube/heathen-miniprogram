import { createRenderInstance } from '@heathen/utils';
import { useCreation } from 'ahooks';
import React, { useEffect } from 'react';

export type RootPortalProps = {
  children: React.ReactElement;
};

const RenderChildren: React.FC<{ children: React.ReactNode }> = (props) => props.children;

/**
 * 作用类似微信官方的RootPortal
 * - 区别在于这个组件真的会将内容渲染到根节点
 */
export const RootPortal: React.FC<RootPortalProps> = ({ children }) => {
  const handler = useCreation(() => createRenderInstance(RenderChildren).create({ children }), []);

  useEffect(() => {
    handler.update({ children });
  }, [children, handler]);

  return null;
};
