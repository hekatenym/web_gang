import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';

interface DraggableWrapperProps {
  id: string;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export function DraggableWrapper({
  id,
  index,
  isSelected,
  onSelect,
  onDelete,
  children
}: DraggableWrapperProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`
            relative 
            group 
            mb-4
            ${snapshot.isDragging ? 'z-50' : ''}
            ${isSelected ? 'ring-2 ring-blue-500' : ''}
          `}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        >
          {/* 拖拽手柄 */}
          <div
            {...provided.dragHandleProps}
            className={`
              absolute 
              top-0 
              left-0 
              p-1
              cursor-move 
              bg-white 
              border 
              border-gray-200
              rounded-br
              opacity-0
              group-hover:opacity-100
              transition-opacity
              z-10
            `}
          >
            <DragOutlined className="text-gray-400" />
          </div>

          {/* 删除按钮 */}
          {onDelete && (
            <div
              className={`
                absolute 
                top-0 
                right-0
                p-1
                cursor-pointer 
                bg-white 
                border 
                border-gray-200
                rounded-bl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                hover:text-red-500
                z-10
              `}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <DeleteOutlined />
            </div>
          )}

          {/* 组件内容 */}
          <div
            className={`
              relative
              ${snapshot.isDragging ? 'opacity-70' : ''}
              transition-all
              duration-200
            `}
          >
            {children}
          </div>

          {/* 拖拽时的占位效果 */}
          {snapshot.isDragging && (
            <div 
              className="
                absolute 
                inset-0 
                border-2 
                border-dashed 
                border-blue-300 
                bg-blue-50 
                rounded-lg
              "
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

// 添加性能优化
export default React.memo(DraggableWrapper);
