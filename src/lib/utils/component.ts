import { Component, ComponentType, ComponentStyle } from '@/types/component';
import { generateId } from './common';

/**
 * 创建新组件
 */
export function createComponent(
  type: ComponentType,
  props?: Partial<Component['props']>
): Component {
  return {
    id: generateId(),
    type,
    props: {
      style: props?.style || {},
      data: props?.data || {},
    },
    children: [],
  };
}

/**
 * 查找组件
 */
export function findComponentById(
  components: Component[],
  id: string
): Component | null {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children?.length) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * 更新组件样式
 */
export function updateComponentStyle(
  component: Component,
  style: Partial<ComponentStyle>
): Component {
  return {
    ...component,
    props: {
      ...component.props,
      style: {
        ...component.props.style,
        ...style,
      },
    },
  };
}

/**
 * 更新组件树中的特定组件
 */
export function updateComponentInTree(
  components: Component[],
  id: string,
  updater: (component: Component) => Component
): Component[] {
  return components.map(component => {
    if (component.id === id) {
      return updater(component);
    }
    if (component.children?.length) {
      return {
        ...component,
        children: updateComponentInTree(component.children, id, updater),
      };
    }
    return component;
  });
} 