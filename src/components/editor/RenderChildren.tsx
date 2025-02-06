import React from 'react';
import { Component } from '@/types/component';

interface RenderChildrenProps {
  children?: Component[];
  renderComponent: (component: Component) => React.ReactNode;
}

export const RenderChildren: React.FC<RenderChildrenProps> = ({ 
  children,
  renderComponent
}) => {
  if (!children?.length) return null;

  return (
    <>
      {children.map(child => renderComponent(child))}
    </>
  );
}; 