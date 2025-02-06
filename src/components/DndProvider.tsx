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

  const handleDragStart = (start: DragStart) => {
    if (start.source.droppableId === 'component-panel') {
      const config = getComponentConfig(start.draggableId);
      setTempComponent(createComponent(config));
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