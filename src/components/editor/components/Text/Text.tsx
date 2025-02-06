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
  const mergedStyle = {
    ...style,
    fontSize: typeof style.fontSize === 'number' ? `${style.fontSize}px` : style.fontSize,
  };

  return (
    <div style={mergedStyle}>
      {data?.text || '点击编辑文本'}
    </div>
  );
};

// 使用 React.memo 包裹组件，只有当 props 发生变化时才重新渲染
export default React.memo(Text); 