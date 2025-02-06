import React from 'react';
import { ComponentProps } from '@/types/component';

interface ImageProps extends ComponentProps {
  style: {
    width?: string | number;
    height?: string | number;
    objectFit?: 'fill' | 'contain' | 'cover' | 'none';
    [key: string]: any;
  };
  data: {
    src: string;
    alt: string;
  };
}

const Image: React.FC<ImageProps> = ({ style, data }) => {
  return (
    <img 
      src={data.src} 
      alt={data.alt}
      style={style}
    />
  );
};

export default Image; 