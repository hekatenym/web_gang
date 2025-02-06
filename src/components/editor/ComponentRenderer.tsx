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
}, (prevProps, nextProps) => {
  // 自定义比较函数，只有当组件 ID 相同且属性发生变化时才重新渲染
  if (prevProps.component.id !== nextProps.component.id) {
    return false;
  }
  
  return (
    JSON.stringify(prevProps.component.props) === JSON.stringify(nextProps.component.props) &&
    prevProps.isPreview === nextProps.isPreview
  );
});

export default ComponentRenderer;