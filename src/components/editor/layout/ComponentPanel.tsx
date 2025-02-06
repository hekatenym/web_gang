import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { theme } from 'antd';
import { getAvailableComponents } from '@/config/components';

const { useToken } = theme;

export function ComponentPanel() {
  const { token } = useToken();
  const components = getAvailableComponents();

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
            padding: token.padding,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            height: '100%',
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
                  <span style={{ fontSize: 16 }}>{config.icon}</span>
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
}

export default React.memo(ComponentPanel); 