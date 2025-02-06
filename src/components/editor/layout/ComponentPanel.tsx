import React from 'react';
import { Tabs, theme } from 'antd';
import { Component } from '@/types/component';
import { ComponentTree } from './ComponentTree';
import { DraggableComponentList } from './DraggableComponentList';

const { useToken } = theme;

interface ComponentPanelProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelect: (component: Component) => void;
}

export const ComponentPanel: React.FC<ComponentPanelProps> = ({
  components,
  selectedComponent,
  onSelect,
}) => {
  const { token } = useToken();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        items={[
          {
            key: 'components',
            label: '组件',
            children: (
              <div style={{ padding: token.padding }}>
                <DraggableComponentList />
              </div>
            ),
          },
          {
            key: 'tree',
            label: '内容树',
            children: (
              <div style={{ 
                padding: token.padding,
                height: `calc(100vh - ${token.margin * 2}px - ${token.controlHeight * 2}px)`,
                overflowY: 'auto'
              }}>
                <ComponentTree
                  components={components}
                  selectedId={selectedComponent?.id}
                  onSelect={onSelect}
                />
              </div>
            ),
          },
        ]}
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
        tabBarStyle={{
          margin: `0 ${token.padding}px`,
          paddingTop: token.padding,
        }}
      />
    </div>
  );
};

export default ComponentPanel; 