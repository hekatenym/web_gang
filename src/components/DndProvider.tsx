'use client';

import React, { useState } from 'react';
import { DragDropContext, DragStart, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from '@/store/hooks';
import { setIsDragging, setDraggingComponent } from '@/store/slices/editorSlice';
import { generateId } from '@/lib/utils';
import { Component, ComponentType } from '@/types/component';
import { getComponentConfig } from '@/config/components';

interface DndProviderProps {
  children: React.ReactNode;
  onDragEnd?: (result: DropResult, component?: Component) => void;
}

export function DndProvider({ children, onDragEnd }: DndProviderProps) {
  const dispatch = useAppDispatch();
  const [tempComponent, setTempComponent] = useState<Component | null>(null);

  const createTempComponent = (componentType: ComponentType): Component | null => {
    const config = getComponentConfig(componentType);
    if (!config) return null;

    return {
      id: generateId(),
      type: componentType,
      props: {
        style: { ...config.defaultProps.style },
        data: { ...config.defaultProps.data }
      }
    };
  };

  const handleDragStart = (start: DragStart) => {
    if (start.source.droppableId === 'component-panel') {
      // 从拖拽ID中提取组件类型
      const componentType = start.draggableId.replace('component-', '') as ComponentType;
      const newComponent = createTempComponent(componentType);
      if (newComponent) {
        setTempComponent(newComponent);
        dispatch(setIsDragging(true));
        dispatch(setDraggingComponent(newComponent));
      }
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination) {
      dispatch(setIsDragging(false));
      dispatch(setDraggingComponent(null));
      setTempComponent(null);
      return;
    }

    try {
      if (source.droppableId === 'component-panel' && 
          destination.droppableId === 'canvas') {
        
        if (!tempComponent) return;

        if (onDragEnd) {
          onDragEnd(result, tempComponent);
        }
      }
      else if (source.droppableId === 'canvas' && 
               destination.droppableId === 'canvas') {
        
        if (onDragEnd) {
          onDragEnd(result);
        }
      }
    } finally {
      dispatch(setIsDragging(false));
      dispatch(setDraggingComponent(null));
      setTempComponent(null);
    }
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DragDropContext>
  );
}

export default DndProvider; 