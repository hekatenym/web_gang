import React from 'react';
import { ComponentProps } from '@/types/component';

export interface TextProps extends ComponentProps {
  style: {
    color?: string;
    fontSize?: string | number;
    textAlign?: 'left' | 'center' | 'right';
    [key: string]: any;
  };
  data: {
    text?: string;
  };
}

const Text: React.FC<TextProps> = ({ style, data }) => {
  return (
    <div style={style}>
      {data?.text || '点击编辑文本'}
    </div>
  );
};

export default Text; 