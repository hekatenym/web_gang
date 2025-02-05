import React from 'react';
import { Layout, Button, Space, Tooltip, theme } from 'antd';
import { ComponentPanel } from './ComponentPanel';
import { Canvas } from './Canvas';
import { PropertyPanel } from './PropertyPanel';
import type { Component } from '@/types/component';
import type { DropResult } from '@hello-pangea/dnd';
import { 
  SaveOutlined, 
  UndoOutlined, 
  RedoOutlined,
  EyeOutlined,
  MobileOutlined,
  DesktopOutlined,
  FontSizeOutlined
} from '@ant-design/icons';
import { generateId } from '@/lib/utils';
import { componentDefinitions } from '@/config/components';

const { Header, Sider, Content } = Layout;
const { useToken } = theme;

interface EditorLayoutProps {
  components: Component[];
  selectedComponent: Component | null;
  onComponentSelect: (component: Component | null) => void;
  onComponentUpdate: (component: Component) => void;
  onComponentDelete: (componentId: string) => void;
  onDragEnd: (result: DropResult, component?: Component) => void;
  onAddComponent: (component: Component) => void;
  onSave: () => void;
}

export function EditorLayout({
  components,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentDelete,
  onDragEnd,
  onAddComponent,
  onSave
}: EditorLayoutProps) {
  const { token } = useToken();

  const layoutStyle: React.CSSProperties = {
    height: '100vh'
  };

  const headerStyle: React.CSSProperties = {
    background: token.colorInfoBg,
    borderBottom: `1px solid ${token.colorPrimaryBorder}`,
    height: 56,
    padding: `0 ${token.paddingLG}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const mainLayoutStyle: React.CSSProperties = {
    background: token.colorBgLayout
  };

  const siderStyle: React.CSSProperties = {
    margin: token.margin,
    marginRight: 0,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    height: `calc(100vh - ${token.margin * 2}px - ${token.controlHeight}px)`,
    overflow: 'hidden'
  };

  const contentStyle: React.CSSProperties = {
    padding: token.padding
  };

  const contentWrapperStyle: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    gap: token.padding
  };

  const canvasWrapperStyle: React.CSSProperties = {
    flex: 1
  };

  const canvasStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
    height: '100%',
    overflow: 'auto'
  };

  const scrollContainerStyle: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto'
  };

  const emptyPanelStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: token.colorTextSecondary
  };

  const handleDragEnd = React.useCallback((result: DropResult, component?: Component) => {
    // 确保 onDragEnd 存在
    if (onDragEnd) {
      onDragEnd(result, component);
    } else {
      console.warn('onDragEnd prop is not provided');
    }
  }, [onDragEnd]);

  const handleAddTextComponent = () => {
    const componentDef = componentDefinitions.text;
    if (!componentDef) return;

    const newComponent: Component = {
      id: generateId(),
      type: 'text',
      props: {
        style: {
          width: '100%',
          padding: '12px',
          ...componentDef.defaultProps?.style
        },
        data: {
          text: '新建文本',
          ...componentDef.defaultProps?.data
        }
      }
    };

    onAddComponent(newComponent);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Space>
          <Space size={token.marginSM}>
            <Button 
              type="primary"
              icon={<SaveOutlined />}
              onClick={onSave}
            >
              保存
            </Button>
            <Button.Group>
              <Tooltip title="撤销">
                <Button icon={<UndoOutlined />} />
              </Tooltip>
              <Tooltip title="重做">
                <Button icon={<RedoOutlined />} />
              </Tooltip>
            </Button.Group>
            <Tooltip title="添加文本">
              <Button 
                icon={<FontSizeOutlined />}
                onClick={handleAddTextComponent}
              >
                添加文本
              </Button>
            </Tooltip>
          </Space>
        </Space>
        <Space size={token.marginSM}>
          <Button.Group>
            <Tooltip title="桌面视图">
              <Button icon={<DesktopOutlined />} type="primary" />
            </Tooltip>
            <Tooltip title="移动视图">
              <Button icon={<MobileOutlined />} />
            </Tooltip>
          </Button.Group>
          <Tooltip title="预览">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      </Header>
      <Layout hasSider style={mainLayoutStyle}>
        <Sider width={280} style={siderStyle}>
          <div style={scrollContainerStyle}>
            <ComponentPanel />
          </div>
        </Sider>
        <Content style={contentStyle}>
          <Canvas
            components={components}
            selectedId={selectedComponent?.id}
            onSelect={onComponentSelect}
            onDelete={onComponentDelete}
          />
        </Content>
        <Sider width={320} style={siderStyle}>
          <PropertyPanel
            component={selectedComponent}
            onUpdate={onComponentUpdate}
            onSave={onSave}
          />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default React.memo(EditorLayout); 