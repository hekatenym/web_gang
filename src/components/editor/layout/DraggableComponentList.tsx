import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { getAvailableComponents } from '@/config/components';
import { theme } from 'antd';

const { useToken } = theme;

export const DraggableComponentList: React.FC = () => {
  const { token } = useToken();
  const components = getAvailableComponents();

  const componentItemStyle = (isDragging: boolean): React.CSSProperties => ({
    padding: `${token.paddingXS}px ${token.padding}px`,
    marginBottom: token.marginXS,
    background: isDragging ? token.colorInfoBg : token.colorBgTextHover,
    borderRadius: token.borderRadius,
    cursor: 'move',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
    userSelect: 'none',
    '&:hover': {
      background: token.colorInfoBgHover,
    },
  });

  return (
    <Droppable
      droppableId="component-panel"
      isDropDisabled={true}
      type="COMPONENT"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            height: `calc(100vh - ${token.margin * 2}px - ${token.controlHeight * 2}px)`,
            overflowY: 'auto',
          }}
        >
          {components.map((config, index) => (
            <Draggable
              key={config.type}
              draggableId={`component-${config.type}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...componentItemStyle(snapshot.isDragging),
                    ...provided.draggableProps.style,
                  }}
                >
                  <span style={{ 
                    fontSize: 16,
                    color: token.colorTextSecondary,
                  }}>
                    {config.icon}
                  </span>
                  <span>{config.title}</span>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}; 