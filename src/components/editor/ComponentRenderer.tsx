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

export const ComponentRenderer = React.memo(({ component, isPreview = false }: ComponentRendererProps) => {
  const ComponentToRender = componentMap[component.type as ComponentType];
  const config = getComponentConfig(component.type as ComponentType);

  if (!ComponentToRender) {
    return null;
  }

  const renderComponent = (childComponent: Component) => (
    <ComponentRenderer
      key={childComponent.id}
      component={childComponent}
      isPreview={isPreview}
    />
  );

  return (
    <ComponentToRender
      style={component.props.style}
      data={component.props.data}
      isPreview={isPreview}
      children={component.children}
      renderComponent={renderComponent}
    />
  );
});

ComponentRenderer.displayName = 'ComponentRenderer';

export default ComponentRenderer;