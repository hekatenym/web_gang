import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

interface DndProviderProps {
  children: React.ReactNode;
  onDragEnd?: (result: DropResult) => void;
}

export function DndProvider({ children, onDragEnd }: DndProviderProps) {
  const handleDragEnd = (result: DropResult) => {
    if (onDragEnd) {
      onDragEnd(result);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
}

export default DndProvider; 