import React from 'react';
import type { Component } from '@/types/component';

interface ButtonProps {
  component: Component;
  isPreview?: boolean;
}

export function Button({ component, isPreview = false }: ButtonProps) {
  const { style, data } = component.props;

  return (
    <a
      href={data.href}
      target={data.target}
      style={style}
      className={`
        button-component
        inline-block
        ${data.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isPreview ? '' : 'hover:ring-2 hover:ring-blue-500'}
      `}
    >
      {data.text}
    </a>
  );
}

export default React.memo(Button);
