import React from 'react';
import { Form, Input, InputNumber, Select, Switch, Tabs, ColorPicker, Card, Space, Divider } from 'antd';
import type { Component } from '@/types/component';
import { componentDefinitions } from '@/config/components';
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

  const componentDef = componentDefinitions[component.type];

  const handleValuesChange = (changedValues: any) => {
    if (!onUpdate) return;

    const styleKeys = ['width', 'height', 'margin', 'padding', 'color', 'backgroundColor', 'fontSize', 'fontWeight'];
    const newStyle = { ...component.props.style };
    const newData = { ...component.props.data };

    // 分类处理变更的值
    Object.entries(changedValues).forEach(([key, value]) => {
      if (styleKeys.includes(key)) {
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

  return (
    <div className="p-4">
      <Card title={`${componentDef?.label || component.type} 属性`} size="small">
        <Form
          form={form}
          layout="vertical"
          // 移除 initialValues，改用 useEffect 设置表单值
          onValuesChange={handleValuesChange}
        >
          <Tabs
            items={[
              {
                key: 'style',
                label: '样式',
                children: (
                  <Space direction="vertical" className="w-full">
                    <Form.Item label="宽度" name="width">
                      <Input placeholder="例如: 100% 或 200px" />
                    </Form.Item>
                    
                    <Form.Item label="高度" name="height">
                      <Input placeholder="例如: auto 或 200px" />
                    </Form.Item>

                    <Form.Item label="内边距" name="padding">
                      <Input placeholder="例如: 8px 或 8px 16px" />
                    </Form.Item>

                    <Form.Item label="外边距" name="margin">
                      <Input placeholder="例如: 8px 或 8px 16px" />
                    </Form.Item>

                    <Divider orientation="left" plain>文字样式</Divider>

                    <Form.Item label="字体大小" name="fontSize">
                      <InputNumber
                        min={12}
                        max={72}
                        formatter={value => `${value}px`}
                        parser={value => value!.replace('px', '')}
                      />
                    </Form.Item>

                    <Form.Item label="字体颜色" name="color">
                      <ColorPicker />
                    </Form.Item>

                    <Form.Item label="背景颜色" name="backgroundColor">
                      <ColorPicker />
                    </Form.Item>
                  </Space>
                ),
              },
              {
                key: 'data',
                label: '数据',
                children: (
                  <Space direction="vertical" className="w-full">
                    {component.type === 'text' && (
                      <Form.Item label="文本内容" name="text">
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    )}
                    
                    {component.type === 'image' && (
                      <>
                        <Form.Item label="图片地址" name="src">
                          <Input placeholder="请输入图片URL" />
                        </Form.Item>
                        <Form.Item label="替代文本" name="alt">
                          <Input placeholder="请输入图片描述" />
                        </Form.Item>
                      </>
                    )}

                    {component.type === 'button' && (
                      <>
                        <Form.Item label="按钮文本" name="text">
                          <Input placeholder="请输入按钮文本" />
                        </Form.Item>
                        <Form.Item label="链接地址" name="link">
                          <Input placeholder="请输入链接地址" />
                        </Form.Item>
                      </>
                    )}
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