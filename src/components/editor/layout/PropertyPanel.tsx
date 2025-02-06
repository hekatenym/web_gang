import React from 'react';
import { Form, Input, InputNumber, Select, Switch, Tabs, ColorPicker, Card, Space, Divider } from 'antd';
import type { Component, ComponentType } from '@/types/component';
import { getComponentConfig } from '@/config/components';
import { theme } from 'antd';

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

  if (!component) {
    return (
      <div className="p-4 text-center text-gray-400">
        请选择一个组件以编辑属性
      </div>
    );
  }

  const config = getComponentConfig(component.type as ComponentType);

  const handleValuesChange = (changedValues: any) => {
    if (!onUpdate || !config) return;

    const newStyle = { ...component.props.style };
    const newData = { ...component.props.data };

    // 分类处理变更的值
    Object.entries(changedValues).forEach(([key, value]) => {
      // 检查是否是样式属性
      const isStyleField = config.editors.style.some(editor => editor.field === key);
      if (isStyleField) {
        newStyle[key] = value;
      } else {
        newData[key] = value;
      }
    });

    // 更新组件
    onUpdate({
      ...component,
      props: {
        style: newStyle,
        data: newData,
      },
    });
  };

  if (!config) {
    return (
      <div className="p-4 text-center text-gray-400">
        未找到组件配置
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card title={`${config.title} 属性`} size="small">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
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
                        {editor.type === 'text' && (
                          <Input placeholder={`请输入${editor.label}`} />
                        )}
                        {editor.type === 'number' && (
                          <InputNumber
                            min={editor.min}
                            max={editor.max}
                            step={editor.step}
                          />
                        )}
                        {editor.type === 'color' && (
                          <ColorPicker />
                        )}
                        {editor.type === 'select' && (
                          <Select options={editor.options} />
                        )}
                        {editor.type === 'switch' && (
                          <Switch />
                        )}
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
                        {editor.type === 'text' && (
                          <Input.TextArea rows={4} placeholder={`请输入${editor.label}`} />
                        )}
                        {editor.type === 'select' && (
                          <Select options={editor.options} />
                        )}
                        {editor.type === 'switch' && (
                          <Switch />
                        )}
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