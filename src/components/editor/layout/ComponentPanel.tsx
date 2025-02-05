import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { componentDefinitions } from '@/config/components';
import { theme } from 'antd';

const { useToken } = theme;

export function ComponentPanel() {
  const { token } = useToken();

  const panelStyle: React.CSSProperties = {
    padding: token.padding,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    height: '100%',
  };

  const componentItemStyle = (isDragging: boolean): React.CSSProperties => ({
    padding: token.paddingSM,
    marginBottom: token.marginXS,
    background: isDragging ? token.colorInfoBg : token.colorBgTextHover,
    borderRadius: token.borderRadius,
    cursor: 'move',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
  });

  return (
    <Droppable droppableId="component-panel" isDropDisabled>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={panelStyle}>
          {Object.entries(componentDefinitions).map(([type, def], index) => (
            <Draggable
              key={`component-${type}`}
              draggableId={`component-${type}`}
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
                  <span style={{ fontSize: 16 }}>{def.icon}</span>
                  <span>{def.title}</span>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(ComponentPanel); 