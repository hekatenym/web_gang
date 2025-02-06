import React from 'react';
import { ComponentProps } from '@/types/component';

interface ButtonProps extends ComponentProps {
  style: {
    width?: string | number;
    padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: number;
    cursor?: string;
    [key: string]: any;
  };
  data: {
    text?: string;
    link?: string;
  };
}

const Button: React.FC<ButtonProps> = ({ style, data }) => {
  // 处理 padding 值
  const getPaddingStyle = (padding: ButtonProps['style']['padding']) => {
    if (typeof padding === 'number') {
      return `${padding}px`;
    }
    if (typeof padding === 'object' && padding !== null) {
      const top = padding.top ?? 4;
      const right = padding.right ?? 12;
      const bottom = padding.bottom ?? 4;
      const left = padding.left ?? 12;
      return `${top}px ${right}px ${bottom}px ${left}px`;
    }
    return '4px 12px';
  };

  const mergedStyle = {
    ...style,
    padding: getPaddingStyle(style.padding),
    borderRadius: typeof style.borderRadius === 'number' ? `${style.borderRadius}px` : style.borderRadius,
  };

  return (
    <button
      style={mergedStyle}
      onClick={(e) => {
        e.preventDefault();
        if (data.link) {
          window.open(data.link, '_blank');
        }
      }}
    >
      {data?.text || '按钮'}
    </button>
  );
};

export default React.memo(Button); 