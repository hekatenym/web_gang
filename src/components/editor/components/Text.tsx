import React from 'react';
import type { Component } from '@/types/component';

interface TextProps {
  component: Component;
  isPreview?: boolean;
}

export function Text({ component, isPreview = false }: TextProps) {
  const { style, data } = component.props;

  return (
    <div 
      style={style}
      className={`
        text-component
        ${isPreview ? '' : 'hover:ring-2 hover:ring-blue-500'}
      `}
    >
      {data.text}
    </div>
  );
}

// 添加性能优化
export default React.memo(Text);
