'use client';

import React from 'react';
import { DragDropContext, DragStart } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setIsDragging,
  setDraggingComponent,
} from '@/store/slices/editorSlice';
import type { DropResult } from '@hello-pangea/dnd';
import { componentDefinitions } from '@/config/components';
import { generateId } from '@/lib/utils';
import type { Component } from '@/types/component';

interface DndProviderProps {
  children: React.ReactNode;
  onDragEnd?: (result: DropResult, component?: Component) => void;
}

export function DndProvider({ children, onDragEnd }: DndProviderProps) {
  const dispatch = useAppDispatch();
  const [tempComponent, setTempComponent] = React.useState<Component | null>(null);
  const editorState = useAppSelector(state => state.editor);

  const handleDragStart = (start: DragStart) => {
    // 如果是从组件面板拖拽
    if (start.source.droppableId === 'component-panel') {
      const componentType = start.draggableId.replace('component-', '');
      const componentDef = componentDefinitions[componentType];
      
      if (componentDef) {
        // 创建临时组件实例
        const newComponent: Component = {
          id: generateId(),
          type: componentType,
          props: {
            style: {
              width: '100%',
              padding: '12px',
              ...componentDef.defaultProps?.style
            },
            data: {
              text: '新建组件',
              ...componentDef.defaultProps?.data
            }
          }
        };
        
        setTempComponent(newComponent);
        dispatch(setDraggingComponent(newComponent));
      }
    }
    
    dispatch(setIsDragging(true));
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // 如果没有目标位置，直接返回
    if (!destination) {
      dispatch(setIsDragging(false));
      dispatch(setDraggingComponent(null));
      setTempComponent(null);
      return;
    }

    try {
      // 从组件面板拖到画布
      if (source.droppableId === 'component-panel' && 
          destination.droppableId === 'canvas') {
        
        if (!tempComponent) {
          console.warn('No temp component for new component drop');
          return;
        }

        if (onDragEnd) {
          onDragEnd(result, tempComponent);
        }
      }
      // 画布内组件重排序
      else if (source.droppableId === 'canvas' && 
               destination.droppableId === 'canvas') {
        
        if (onDragEnd) {
          // 画布内移动不需要临时组件
          onDragEnd(result);
        }
      }
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
    } finally {
      // 清理状态
      dispatch(setIsDragging(false));
      dispatch(setDraggingComponent(null));
      setTempComponent(null);
    }
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
}

export default DndProvider; 