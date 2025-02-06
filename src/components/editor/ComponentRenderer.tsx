import React from 'react';
import { Component, ComponentType } from '@/types/component';
import { getComponentConfig } from '@/config/components';
import { Text, Image, Button, Container } from './components';

// 创建组件映射表
const componentMap = {
  [ComponentType.TEXT]: Text,
  [ComponentType.IMAGE]: Image,
  [ComponentType.BUTTON]: Button,
  [ComponentType.CONTAINER]: Container,
};

interface ComponentRendererProps {
  component: Component;
  isPreview?: boolean;
}

export function ComponentRenderer({ component, isPreview = false }: ComponentRendererProps) {
  const ComponentToRender = componentMap[component.type as ComponentType];
  const config = getComponentConfig(component.type as ComponentType);

  if (!ComponentToRender) {
    console.error(`Component type ${component.type} not found in:`, componentMap);
    return null;
  }

  // 合并默认属性和组件属性
  const style = {
    ...config?.defaultProps.style,
    ...component.props.style,
  };

  const data = {
    ...config?.defaultProps.data,
    ...component.props.data,
  };

  return (
    <ComponentToRender
      style={style}
      data={data}
      isPreview={isPreview}
    />
  );
}

export default React.memo(ComponentRenderer);