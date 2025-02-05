import { Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

interface DraggableComponentProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

export const DraggableComponent = ({ id, index, children }: DraggableComponentProps) => {
  // 用于处理 SSR 水合问题
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 或者返回一个加载占位符
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} // 这里添加拖拽句柄
          className="cursor-move" // 添加移动光标样式
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}; 