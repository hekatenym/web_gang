import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { DraggableComponent } from '../DraggableComponent';
import { ComponentRenderer } from '../ComponentRenderer';
import type { Component } from '@/types/component';

interface ContainerProps {
  component: Component;
  isPreview?: boolean;
  onSelect?: (component: Component) => void;
  onDelete?: (componentId: string) => void;
}

export function Container({ 
  component, 
  isPreview = false,
  onSelect,
  onDelete
}: ContainerProps) {
  const { style, data } = component.props;
  const containerId = `container-${component.id}`;

  if (isPreview) {
    return (
      <div 
        className="w-full"
        style={{
          ...style,
          display: 'flex',
          flexDirection: data.direction === 'horizontal' ? 'row' : 'column',
          flexWrap: data.wrap ? 'wrap' : 'nowrap',
        }}
      >
        {component.children?.map(child => (
          <ComponentRenderer 
            key={child.id} 
            component={child}
            isPreview={true}
          />
        ))}
      </div>
    );
  }

  return (
    <Droppable droppableId={containerId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            w-full
            transition-all
            duration-200
            ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}
          `}
          style={{
            ...style,
            display: 'flex',
            flexDirection: data.direction === 'horizontal' ? 'row' : 'column',
            flexWrap: data.wrap ? 'wrap' : 'nowrap',
          }}
        >
          {component.children?.map((child, index) => (
            <DraggableComponent
              key={child.id}
              component={child}
              index={index}
              onSelect={onSelect}
              onDelete={onDelete}
            >
              <ComponentRenderer 
                component={child}
                isPreview={false}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            </DraggableComponent>
          ))}
          {provided.placeholder}
          
          {/* 空容器提示 */}
          {(!component.children || component.children.length === 0) && (
            <div 
              className={`
                min-h-[100px]
                flex
                items-center
                justify-center
                text-gray-400
                text-sm
                border-2
                border-dashed
                border-gray-200
                rounded-lg
                w-full
                ${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-200' : ''}
              `}
            >
              {snapshot.isDraggingOver 
                ? '放置组件到这里'
                : '拖拽组件到这里'
              }
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

// 添加性能优化
export default React.memo(Container);