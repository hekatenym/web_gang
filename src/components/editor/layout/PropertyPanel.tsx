import React from 'react';
import { Form, Input, InputNumber, Select, Switch, Tabs, ColorPicker, Card, Space, Divider } from 'antd';
import type { Component, ComponentType } from '@/types/component';
import { getComponentConfig } from '@/config/components';
import { theme } from 'antd';
import { SpaceEditor } from '@/components/editor/editors/SpaceEditor';

const { useToken } = theme;

interface PropertyPanelProps {
  component: Component | null;
  onUpdate?: (component: Component) => void;
}

export function PropertyPanel({ component, onUpdate }: PropertyPanelProps) {
  const { token } = useToken();
  const [form] = Form.useForm();

  // 添加 useEffect 来监听 component 变化
  React.useEffect(() => {
    if (component) {
      // 重置表单值为当前组件的属性
      form.setFieldsValue({
        ...component.props.style,
        ...component.props.data,
      });
    }
  }, [component, form]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (!onUpdate || !component) return;

    const config = getComponentConfig(component.type as ComponentType);
    if (!config) return;

    // 分离样式和数据属性
    const currentStyle: Record<string, any> = {};
    const currentData: Record<string, any> = {};

    // 使用所有表单值来更新
    Object.entries(allValues).forEach(([key, value]) => {
      // 检查是否是样式属性
      const isStyleField = config.editors.style.some(editor => editor.field === key);
      
      if (isStyleField) {
        // 对于颜色值，需要获取正确的格式
        const editor = config.editors.style.find(e => e.field === key);
        if (editor?.type === 'color' && value) {
          // 检查值是否有 toHexString 方法（ColorPicker 的值）
          currentStyle[key] = typeof value.toHexString === 'function' 
            ? value.toHexString() 
            : value;
        } else {
          currentStyle[key] = value;
        }
      } else {
        currentData[key] = value;
      }
    });

    // 更新组件，合并现有属性和新值
    onUpdate({
      ...component,
      props: {
        style: {
          ...component.props.style,  // 保留未在表单中的样式属性
          ...currentStyle,           // 更新表单中的样式属性
        },
        data: {
          ...component.props.data,   // 保留未在表单中的数据属性
          ...currentData,            // 更新表单中的数据属性
        },
      },
    });
  };

  if (!component) {
    return (
      <div className="p-4 text-center text-gray-400">
        请选择一个组件以编辑属性
      </div>
    );
  }

  const config = getComponentConfig(component.type as ComponentType);
  if (!config) return null;

  const renderEditorField = (editor: any) => {
    switch (editor.type) {
      case 'color':
        return (
          <ColorPicker
            format="hex"
            allowClear={false}
            showText
          />
        );
      case 'number':
        const needsPxUnit = ['fontSize', 'borderRadius', 'width', 'height', 'gap'].includes(editor.field);
        return (
          <InputNumber
            min={editor.min}
            max={editor.max}
            step={editor.step}
            addonAfter={needsPxUnit ? 'px' : undefined}
          />
        );
      case 'select':
        return <Select options={editor.options} />;
      case 'space':
        return (
          <SpaceEditor
            min={editor.min}
            max={editor.max}
            step={editor.step}
          />
        );
      default:
        return <Input />;
    }
  };

  return (
    <div className="p-4">
      <Card title={`${config.title} 属性`} size="small">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          initialValues={{
            ...config.defaultProps.style,
            ...config.defaultProps.data,
            ...component.props.style,
            ...component.props.data,
          }}
        >
          <Tabs
            items={[
              {
                key: 'style',
                label: '样式',
                children: (
                  <Space direction="vertical" className="w-full">
                    {config.editors.style.map(editor => (
                      <Form.Item
                        key={editor.field}
                        label={editor.label}
                        name={editor.field}
                      >
                        {renderEditorField(editor)}
                      </Form.Item>
                    ))}
                  </Space>
                ),
              },
              {
                key: 'data',
                label: '数据',
                children: (
                  <Space direction="vertical" className="w-full">
                    {config.editors.data.map(editor => (
                      <Form.Item
                        key={editor.field}
                        label={editor.label}
                        name={editor.field}
                      >
                        <Input />
                      </Form.Item>
                    ))}
                  </Space>
                ),
              },
            ]}
          />
        </Form>
      </Card>
    </div>
  );
}

export default React.memo(PropertyPanel); 