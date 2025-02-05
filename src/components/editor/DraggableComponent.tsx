import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Component } from '@/types/component';
import { theme } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { useToken } = theme;

interface DraggableComponentProps {
  component: Component;
  index: number;
  isSelected?: boolean;
  onSelect?: (component: Component) => void;
  onDelete?: (componentId: string) => void;
  children: React.ReactNode;
}

export function DraggableComponent({
  component,
  index,
  isSelected,
  onSelect,
  onDelete,
  children
}: DraggableComponentProps) {
  const { token } = useToken();

  const componentStyle = (isDragging: boolean): React.CSSProperties => ({
    position: 'relative',
    padding: token.paddingXS,
    border: `2px solid ${isSelected ? token.colorPrimary : 'transparent'}`,
    borderRadius: token.borderRadius,
    transition: 'all 0.2s',
    background: isDragging ? token.colorInfoBg : 'transparent',
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
  });

  const deleteButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: -20,
    right: 0,
    padding: 4,
    background: token.colorError,
    color: token.colorWhite,
    borderRadius: '50%',
    cursor: 'pointer',
    display: isSelected ? 'block' : 'none',
    zIndex: 1,
  };

  const componentTypeLabel: React.CSSProperties = {
    position: 'absolute',
    top: -24,
    left: 0,
    padding: '2px 8px',
    background: token.colorPrimary,
    color: token.colorWhite,
    borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
    fontSize: token.fontSizeSM,
    display: isSelected ? 'block' : 'none',
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...componentStyle(snapshot.isDragging),
            ...provided.draggableProps.style,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(component);
          }}
        >
          <div style={componentTypeLabel}>
            {component.type}
          </div>
          
          {isSelected && (
            <div
              style={deleteButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(component.id);
              }}
            >
              <DeleteOutlined />
            </div>
          )}
          {children}
        </div>
      )}
    </Draggable>
  );
} 