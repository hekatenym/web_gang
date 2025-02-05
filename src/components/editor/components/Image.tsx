import React from 'react';
import type { Component } from '@/types/component';

interface ImageProps {
  component: Component;
  isPreview?: boolean;
}

export function Image({ component, isPreview = false }: ImageProps) {
  const { style, data } = component.props;

  return (
    <img
      src={data.src}
      alt={data.alt}
      style={style}
      className={`
        image-component
        ${isPreview ? '' : 'hover:ring-2 hover:ring-blue-500'}
      `}
    />
  );
}

export default React.memo(Image);