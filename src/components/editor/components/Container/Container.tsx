import React from 'react';
import { ComponentProps } from '@/types/component';

interface ContainerProps extends ComponentProps {
  style: {
    backgroundColor?: string;
    padding?: string | number;
    minHeight?: string | number;
    border?: string;
    [key: string]: any;
  };
  data: {
    direction?: 'vertical' | 'horizontal';
    wrap?: boolean;
  };
}

const Container: React.FC<ContainerProps> = ({ style, data, children }) => {
  const containerStyle = {
    ...style,
    display: 'flex',
    flexDirection: data.direction === 'horizontal' ? 'row' : 'column',
    flexWrap: data.wrap ? 'wrap' : 'nowrap',
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default Container; 