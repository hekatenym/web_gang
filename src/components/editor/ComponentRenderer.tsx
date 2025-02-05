import React from 'react';
import type { Component } from '@/types/component';
import { componentDefinitions } from '@/config/components';

interface ComponentRendererProps {
  component: Component;
  isPreview?: boolean;
}

export function ComponentRenderer({ component, isPreview = false }: ComponentRendererProps) {
  const componentDef = componentDefinitions[component.type];

  if (!componentDef) {
    return (
      <div style={{ padding: 8, border: '1px solid red', color: 'red' }}>
        未知组件类型: {component.type}
      </div>
    );
  }

  // 基础样式
  const baseStyle: React.CSSProperties = {
    ...component.props?.style,
    position: 'relative',
  };

  // 预览模式样式
  const previewStyle: React.CSSProperties = isPreview ? {
    pointerEvents: 'none',
    opacity: 0.7,
  } : {};

  const finalStyle = {
    ...baseStyle,
    ...previewStyle,
  };

  // 根据组件类型渲染不同的内容
  switch (component.type) {
    case 'text':
      return (
        <div style={finalStyle}>
          {component.props?.data?.text || '文本组件'}
        </div>
      );
    
    case 'image':
      return (
        <img
          src={component.props?.data?.src || 'https://via.placeholder.com/400x200'}
          alt={component.props?.data?.alt || ''}
          style={finalStyle}
        />
      );
    
    case 'button':
      return (
        <button
          style={finalStyle}
          onClick={(e) => {
            e.stopPropagation();
            if (!isPreview && component.props?.data?.link) {
              window.open(component.props.data.link, '_blank');
            }
          }}
        >
          {component.props?.data?.text || '按钮'}
        </button>
      );

    default:
      return (
        <div style={{ padding: 8, border: '1px solid red', color: 'red' }}>
          未知组件类型: {component.type}
        </div>
      );
  }
}

export default React.memo(ComponentRenderer);