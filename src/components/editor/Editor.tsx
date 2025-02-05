import React, { useState, useCallback, useEffect } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { message } from 'antd';
import { EditorLayout } from './layout/EditorLayout';
import { generateId } from '@/lib/utils';
import { componentDefinitions } from '@/config/components';
import { ComponentType, type Component } from '@/types/component';

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
  console.log('Editor initializing with:', { initialComponents });

  // 初始化组件状态，确保使用有效的初始组件
  const [components, setComponents] = useState<Component[]>(() => {
    // 过滤掉无效的组件
    const validComponents = initialComponents.filter((component): component is Component => 
      component != null && 
      typeof component === 'object' && 
      'id' in component &&
      'type' in component &&
      'props' in component
    );
    console.log('Initialized with valid components:', validComponents);
    return validComponents;
  });
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  // 处理拖拽结束事件
  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    if (!destination) {
      console.log('No valid destination');
      return;
    }

    console.log('Drag end:', { source, destination, draggableId });

    // 从组件面板拖入
    if (source.droppableId === 'componentPanel') {
      const componentType = draggableId.replace('component-', '') as ComponentType;
      const componentDef = componentDefinitions[componentType];
      
      if (!componentDef) {
        console.error('Component definition not found:', componentType);
        message.error('未找到组件定义');
        return;
      }

      try {
        // 创建新组件实例，确保所有必需的属性都存在
        const newComponent: Component = {
          id: generateId(),
          type: componentType,
          props: {
            style: {
              width: '100%',
              ...componentDef.defaultProps?.style
            },
            data: {
              ...componentDef.defaultProps?.data
            }
          },
          children: componentType === ComponentType.CONTAINER ? [] : undefined,
        };

        console.log('Created new component:', newComponent);

        // 添加到画布
        if (destination.droppableId === 'canvas') {
          setComponents(prevComponents => {
            const newComponents = [...prevComponents];
            newComponents.splice(destination.index, 0, newComponent);
            console.log('Updated components:', newComponents);
            onChange?.(newComponents);
            return newComponents;
          });
        }
      } catch (error) {
        console.error('Error creating component:', error);
        message.error('添加组件失败');
      }
    }
    // 画布内排序
    else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      console.log('Reordering within canvas:', {
        fromIndex: source.index,
        toIndex: destination.index
      });
      
      setComponents(prevComponents => {
        console.log('Previous components before reorder:', prevComponents);
        const newComponents = Array.from(prevComponents);
        const [movedComponent] = newComponents.splice(source.index, 1);
        newComponents.splice(destination.index, 0, movedComponent);
        
        console.log('Components after reorder:', newComponents);
        
        // 触发 onChange 回调
        if (onChange) {
          console.log('Calling onChange after reorder with:', newComponents);
          onChange(newComponents);
        }
        
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

  // 监听组件状态变化
  useEffect(() => {
    console.log('Components state changed:', components);
  }, [components]);

  // 监听选中组件变化
  useEffect(() => {
    console.log('Selected component changed:', selectedComponent);
  }, [selectedComponent]);

  // 自动保存
  useEffect(() => {
    if (!components.length) {
      console.log('No components to save');
      return;
    }

    console.log('Setting up auto-save timer');
    const timer = setTimeout(() => {
      console.log('Auto saving components:', components);
      onSave?.(components);
    }, 1000);

    return () => {
      console.log('Clearing auto-save timer');
      clearTimeout(timer);
    };
  }, [components, onSave]);

  return (
    <EditorLayout
      components={components}
      selectedComponent={selectedComponent}
      onComponentSelect={handleComponentSelect}
      onComponentUpdate={handleComponentUpdate}
      onComponentDelete={handleComponentDelete}
      onDragEnd={handleDragEnd}
    />
  );
}

export default React.memo(Editor); 