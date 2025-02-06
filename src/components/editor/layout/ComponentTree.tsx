import React from 'react';
import { Tree } from 'antd';
import type { Component } from '@/types/component';
import { getComponentConfig } from '@/config/components';
import type { DataNode } from 'antd/es/tree';

interface ComponentTreeProps {
  components: Component[];
  selectedId?: string;
  onSelect: (component: Component) => void;
}

export const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedId,
  onSelect,
}) => {
  // 将组件数据转换为树节点
  const convertToTreeData = (components: Component[]): DataNode[] => {
    return components.map(component => {
      const config = getComponentConfig(component.type);
      return {
        key: component.id,
        title: `${config?.title || '组件'} ${component.props.data.text || ''}`,
        icon: config?.icon,
        children: component.children ? convertToTreeData(component.children) : undefined,
      };
    });
  };

  // 处理选择事件
  const handleSelect = (selectedKeys: React.Key[]) => {
    const componentId = selectedKeys[0] as string;
    const findComponent = (components: Component[]): Component | null => {
      for (const comp of components) {
        if (comp.id === componentId) {
          return comp;
        }
        if (comp.children?.length) {
          const found = findComponent(comp.children);
          if (found) return found;
        }
      }
      return null;
    };

    const component = findComponent(components);
    if (component) {
      onSelect(component);
    }
  };

  const treeData = convertToTreeData(components);

  return (
    <div className="p-4">
      <Tree
        treeData={treeData}
        selectedKeys={selectedId ? [selectedId] : []}
        onSelect={handleSelect}
        showIcon
      />
    </div>
  );
}; 