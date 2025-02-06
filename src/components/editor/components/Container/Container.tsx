import React from 'react';
import { ComponentProps, Component } from '@/types/component';
import { RenderChildren } from '../../RenderChildren';

interface ContainerProps extends ComponentProps {
  style: {
    width?: string | number;
    minHeight?: string | number;
    padding?: { top: number; right: number; bottom: number; left: number };
    backgroundColor?: string;
    border?: string;
    display?: string;
    gap?: number;
    [key: string]: any;
  };
  data: {
    direction?: 'vertical' | 'horizontal';
    wrap?: boolean;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  };
  children?: Component[];
  renderComponent?: (component: Component) => React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ 
  style, 
  data, 
  children,
  renderComponent 
}) => {
  // 处理内边距对象
  const padding = style.padding 
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

  const containerStyle = {
    ...style,
    padding,
    display: 'flex',
    flexDirection: data.direction === 'horizontal' ? 'row' : 'column',
    flexWrap: data.wrap ? 'wrap' : 'nowrap',
    justifyContent: data.justify || 'flex-start',
    alignItems: data.align || 'flex-start',
  };

  return (
    <div style={containerStyle}>
      {renderComponent && (
        <RenderChildren 
          children={children} 
          renderComponent={renderComponent}
        />
      )}
    </div>
  );
};

export default Container; 