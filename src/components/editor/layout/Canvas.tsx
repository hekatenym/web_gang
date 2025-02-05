import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { DraggableComponent } from '../DraggableComponent';
import { ComponentRenderer } from '../ComponentRenderer';
import type { Component } from '@/types/component';
import { InboxOutlined } from '@ant-design/icons';
import { theme } from 'antd';

const { useToken } = theme;

interface CanvasProps {
  components: Component[];
  selectedId?: string;
  onSelect?: (component: Component) => void;
  onDelete?: (componentId: string) => void;
}

export function Canvas({
  components = [],
  selectedId,
  onSelect,
  onDelete
}: CanvasProps) {
  const { token } = useToken();

  const dropAreaStyle = React.useCallback((isDraggingOver: boolean): React.CSSProperties => ({
    minHeight: '100%',
    padding: token.padding,
    transition: 'all 0.2s',
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    border: `2px dashed ${isDraggingOver ? token.colorPrimary : 'transparent'}`,
  }), [token]);

  const componentListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: token.margin,
    minHeight: '100%',
    padding: token.padding
  };

  const emptyAreaStyle: React.CSSProperties = {
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.marginMD,
    color: token.colorTextSecondary,
    transition: 'all 0.2s',
    padding: token.padding
  };

  return (
    <Droppable droppableId="canvas">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...dropAreaStyle(snapshot.isDraggingOver),
            background: snapshot.isDraggingOver ? token.colorInfoBg : token.colorBgContainer,
          }}
          onClick={() => onSelect?.(null)}
        >
          {Array.isArray(components) && components.length > 0 ? (
            <>
              {components.map((component, index) => (
                <DraggableComponent
                  key={component.id}
                  component={component}
                  index={index}
                  isSelected={selectedId === component.id}
                  onSelect={onSelect}
                  onDelete={onDelete}
                >
                  <ComponentRenderer
                    component={component}
                    isPreview={false}
                  />
                </DraggableComponent>
              ))}
              {provided.placeholder}
            </>
          ) : (
            <>
              <div style={emptyAreaStyle}>
                <div style={{ fontSize: 48 }}>
                  <InboxOutlined />
                </div>
                <div>
                  {snapshot.isDraggingOver ? '放置组件到这里' : '从左侧拖拽组件到这里'}
                </div>
              </div>
              {provided.placeholder}
            </>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(Canvas); 