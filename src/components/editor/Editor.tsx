import React, { useState, useCallback, useEffect } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { message } from 'antd';
import { EditorLayout } from './layout/EditorLayout';
import { generateId } from '@/lib/utils';
import { getComponentConfig } from '@/config/components';
import { ComponentType, type Component } from '@/types/component';
import { DndProvider } from './DndProvider';

interface EditorProps {
  initialComponents?: Component[];
  onChange?: (components: Component[]) => void;
  onSave?: (components: Component[]) => void;
}

export function Editor({ 
  initialComponents = [], 
  onChange,
  onSave 
}: EditorProps) {
  // 初始化组件状态，确保使用有效的初始组件
  const [components, setComponents] = useState<Component[]>(() => {
    const validComponents = initialComponents.filter((component): component is Component => 
      component != null && 
      typeof component === 'object' && 
      'id' in component &&
      'type' in component &&
      'props' in component
    );
    return validComponents;
  });
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  // 处理拖拽结束事件
  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination || result.type !== 'COMPONENT') return;

    const { source, destination } = result;

    // 从组件面板拖到画布
    if (source.droppableId === 'component-panel' && destination.droppableId === 'canvas') {
      const componentType = result.draggableId.replace('component-', '') as ComponentType;
      const config = getComponentConfig(componentType);
      
      if (config) {
        const newComponent: Component = {
          id: generateId(),
          type: componentType,
          props: {
            style: { ...config.defaultProps.style },
            data: { ...config.defaultProps.data }
          }
        };

        setComponents(prevComponents => {
          const newComponents = [...prevComponents];
          newComponents.splice(destination.index, 0, newComponent);
          onChange?.(newComponents);
          return newComponents;
        });
      }
    }
    // 画布内排序
    else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      setComponents(prevComponents => {
        const newComponents = Array.from(prevComponents);
        const [movedComponent] = newComponents.splice(source.index, 1);
        newComponents.splice(destination.index, 0, movedComponent);
        onChange?.(newComponents);
        return newComponents;
      });
    }
  }, [onChange]);

  // 处理组件选择
  const handleComponentSelect = useCallback((component: Component | null) => {
    setSelectedComponent(component);
  }, []);

  // 处理组件更新
  const handleComponentUpdate = useCallback((updatedComponent: Component) => {
    setComponents(prevComponents => {
      const newComponents = prevComponents.map(comp => 
        comp.id === updatedComponent.id ? updatedComponent : comp
      );
      // 触发 onChange 回调
      onChange?.(newComponents);
      return newComponents;
    });
  }, [onChange]);

  // 处理组件删除
  const handleComponentDelete = useCallback((componentId: string) => {
    setComponents(prevComponents => {
      const newComponents = prevComponents.filter(comp => comp.id !== componentId);
      // 触发 onChange 回调
      onChange?.(newComponents);
      return newComponents;
    });
  }, [onChange]);

  // 自动保存
  useEffect(() => {
    if (!components.length) return;

    const timer = setTimeout(() => {
      onSave?.(components);
    }, 1000);

    return () => clearTimeout(timer);
  }, [components, onSave]);

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      <EditorLayout
        components={components}
        selectedComponent={selectedComponent}
        onComponentSelect={handleComponentSelect}
        onComponentUpdate={handleComponentUpdate}
        onComponentDelete={handleComponentDelete}
        onSave={() => onSave?.(components)}
      />
    </DndProvider>
  );
}

export default React.memo(Editor); 