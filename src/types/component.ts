import { ReactNode } from 'react';

// 组件类型枚举
export enum ComponentType {
  TEXT = 'text',
  IMAGE = 'image', 
  BUTTON = 'button',
  CONTAINER = 'container'
}

// 组件样式接口
export interface ComponentStyle {
  // 布局相关
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  padding?: string | number;
  position?: 'static' | 'relative' | 'absolute' | 'fixed';
  display?: 'block' | 'inline' | 'inline-block' | 'flex';
  
  // Flex布局
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  gap?: string | number;
  
  // 外观相关
  color?: string;
  backgroundColor?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string | number;
  border?: string;
  boxShadow?: string;
  
  // 其他样式属性
  lineHeight?: string | number;
  minHeight?: string | number;
  cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed';
  objectFit?: 'fill' | 'contain' | 'cover' | 'none';
}

// 组件数据接口
export interface ComponentData {
  // 文本组件数据
  text?: string;
  
  // 图片组件数据
  src?: string;
  alt?: string;
  
  // 按钮组件数据
  href?: string;
  target?: '_self' | '_blank';
  disabled?: boolean;
  
  // 容器组件数据
  direction?: 'vertical' | 'horizontal';
  wrap?: boolean;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  spacing?: string | number;
}

// 组件属性编辑器接口
export interface ComponentEditor {
  label: string;
  type: 'text' | 'number' | 'color' | 'select' | 'switch';
  field: string;
  options?: Array<{
    label: string;
    value: any;
  }>;
  min?: number;
  max?: number;
  step?: number;
}

// 组件注册接口
export interface ComponentRegistration {
  type: ComponentType;
  title: string;
  icon: ReactNode;
  component: React.ComponentType<ComponentProps>;
  defaultProps: {
    style: Partial<ComponentStyle>;
    data: Partial<ComponentData>;
  };
  editors: {
    style: ComponentEditor[];
    data: ComponentEditor[];
  };
}

// 组件Props接口
export interface ComponentProps {
  style: Partial<ComponentStyle>;
  data: Partial<ComponentData>;
  children?: ReactNode;
}

// 组件实例接口
export interface Component {
  id: string;
  type: ComponentType;
  props: {
    style: ComponentStyle;
    data: ComponentData;
  };
  children?: Component[];
}
