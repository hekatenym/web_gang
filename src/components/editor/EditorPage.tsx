'use client';

import { useEffect, useState, useCallback } from 'react';
import { Layout, message, App } from 'antd';
import { EditorLayout } from './layout/EditorLayout';
import { Component } from '@/types/component';
import { getPage, savePage, type Page } from '@/services/page';
import type { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  setComponents, 
  setSelectedComponent,
  updateComponent,
  deleteComponent 
} from '@/store/slices/editorSlice';
import { componentDefinitions } from '@/config/components';
import { generateId } from '@/lib/utils';
import React from 'react';
import { store } from '@/store/index';
import { DndProvider } from '@/components/DndProvider';
import { ComponentType } from '@/types/component';
import { getComponentConfig } from '@/config/components';

const { Content } = Layout;

interface EditorPageProps {
  id: string;
}

export function EditorPage({ id }: EditorPageProps) {
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const components = useAppSelector(state => state.editor.components);
  const selectedComponent = useAppSelector(state => state.editor.selectedComponent);
  const editorState = useAppSelector(state => state.editor);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<Page | null>(null);

  // 加载页面数据
  useEffect(() => {
    const loadPage = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPage(id);

        if (!data) {
          setLoading(false);
          return;
        }

        // 过滤并初始化组件数组
        const validComponents = Array.isArray(data.components) 
          ? data.components
            .filter(comp => comp != null)
            .map(comp => {
              const type = comp?.type || ComponentType.TEXT;
              const config = getComponentConfig(type);
              
              return {
                id: comp?.id || generateId(),
                type,
                props: {
                  style: {
                    width: '100%',
                    ...(config?.defaultProps.style || {}),
                    ...(comp?.props?.style || {})
                  },
                  data: {
                    ...(config?.defaultProps.data || {}),
                    ...(comp?.props?.data || {})
                  }
                }
              };
            })
          : [];

        // 设置页面数据和组件
        setPageData({
          ...data,
          components: validComponents
        });
        dispatch(setComponents(validComponents));
      } catch (error) {
        console.error('加载页面失败:', error);
        message.error('加载页面失败');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [id, dispatch, message]);

  // 首先定义 handleAutoSave
  const handleAutoSave = useCallback(async (newComponents: Component[]) => {
    if (!pageData?._id) {
      return;
    }
    
    try {
      const normalizedComponents = newComponents.map((comp) => ({
        id: comp.id,
        type: comp.type,
        props: {
          style: comp.props?.style || {},
          data: comp.props?.data || {},
        },
      }));

      const updatedPage = await savePage(pageData._id, {
        ...pageData,
        components: normalizedComponents,
      });
      
      setPageData(updatedPage);
    } catch (error) {
      console.error('自动保存失败:', error);
    }
  }, [pageData]);

  // 然后定义 handleDragEnd
  const handleDragEnd = useCallback((result: DropResult, draggedComponent?: Component) => {
    if (!result.destination) {
      return;
    }

    try {
      // 从组件面板拖到画布
      if (result.source.droppableId === 'component-panel' && 
          result.destination.droppableId === 'canvas') {
        
        if (!draggedComponent) {
          console.warn('No dragged component provided');
          return;
        }

        // 创建新组件
        const newComponent = {
          id: draggedComponent.id,
          type: draggedComponent.type,
          props: {
            style: { ...draggedComponent.props.style },
            data: { ...draggedComponent.props.data }
          }
        };

        // 获取当前组件列表并在指定位置插入新组件
        const currentComponents = [...components];
        currentComponents.splice(result.destination.index, 0, newComponent);

        // 更新状态
        dispatch(setComponents(currentComponents));
        dispatch(setSelectedComponent(newComponent));

        // 自动保存
        handleAutoSave(currentComponents);
      }
      
      // 画布内重新排序
      else if (result.source.droppableId === 'canvas' && 
               result.destination.droppableId === 'canvas') {
        console.log('Reordering within canvas:', {
          source: result.source,
          destination: result.destination
        });
        
        // 获取当前组件列表
        const currentComponents = [...components];
        
        // 找到被拖拽的组件
        const draggedComponent = currentComponents[result.source.index];
        
        // 从原位置移除
        currentComponents.splice(result.source.index, 1);
        
        // 插入到新位置
        currentComponents.splice(result.destination.index, 0, draggedComponent);
        
        console.log('Components after reorder:', currentComponents);
        
        // 更新状态
        dispatch(setComponents(currentComponents));
        
        // 保持选中状态
        dispatch(setSelectedComponent(draggedComponent));
        
        // 自动保存
        handleAutoSave(currentComponents);
      }
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
      message.error('操作失败');
    }
  }, [components, dispatch, handleAutoSave, message]);

  const handleComponentSelect = (component: Component | null) => {
    dispatch(setSelectedComponent(component));
  };

  const handleComponentUpdate = (updatedComponent: Component) => {
    dispatch(updateComponent(updatedComponent));
  };

  const handleComponentDelete = (componentId: string) => {
    dispatch(deleteComponent(componentId));
    if (selectedComponent?.id === componentId) {
      dispatch(setSelectedComponent(null));
    }
  };

  // 手动保存
  const handleSave = async () => {
    if (!pageData?._id) return;

    try {
      const normalizedComponents = components.map(comp => ({
        id: comp.id,
        type: comp.type,
        props: {
          style: comp.props?.style || {},
          data: comp.props?.data || {}
        }
      }));

      const updatedPage = await savePage(pageData._id, {
        ...pageData,
        components: normalizedComponents,
      });
      
      setPageData(updatedPage);
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  const handleAddComponent = (component: Component) => {
    try {
      const newComponents = [...components, component];
      dispatch(setComponents(newComponents));
      handleAutoSave(newComponents);
      dispatch(setSelectedComponent(component));
    } catch (error) {
      message.error('添加组件失败');
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">加载中...</div>;
  }

  if (!id) {
    return <div className="h-screen flex items-center justify-center">无效的页面 ID</div>;
  }

  if (!pageData) {
    return <div className="h-screen flex items-center justify-center">页面不存在</div>;
  }

  return (
    <Layout className="h-screen">
      <Content>
        <DndProvider onDragEnd={handleDragEnd}>
          <EditorLayout
            components={components}
            selectedComponent={selectedComponent}
            onComponentSelect={handleComponentSelect}
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            onDragEnd={handleDragEnd}
            onAddComponent={handleAddComponent}
            onSave={handleSave}
          />
        </DndProvider>
      </Content>
    </Layout>
  );
} 