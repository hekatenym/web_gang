import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import type { IPage } from '@/models/page.model';

interface PageInfoEditorProps {
  page?: Partial<IPage>;
  onSubmit: (values: Partial<IPage>) => void;
  loading?: boolean;
}

export function PageInfoEditor({ page, onSubmit, loading = false }: PageInfoEditorProps) {
  const [form] = Form.useForm();

  return (
    <Card title="页面信息">
      <Form
        form={form}
        layout="vertical"
        initialValues={page}
        onFinish={onSubmit}
      >
        <Form.Item
          label="页面标题"
          name="title"
          rules={[{ required: true, message: '请输入页面标题' }]}
        >
          <Input placeholder="请输入页面标题" />
        </Form.Item>

        <Form.Item
          label="页面路由"
          name="route"
          rules={[
            { required: true, message: '请输入页面路由' },
            { pattern: /^\/[\w\-\/]*$/, message: '路由格式不正确' }
          ]}
        >
          <Input placeholder="例如: /about-us" />
        </Form.Item>

        <Form.Item
          label="页面描述"
          name="description"
          rules={[{ required: true, message: '请输入页面描述' }]}
        >
          <Input.TextArea 
            placeholder="请输入页面描述"
            rows={3}
          />
        </Form.Item>

        {/* SEO 信息 */}
        <Form.Item label="SEO 标题" name={['seo', 'title']}>
          <Input placeholder="SEO 标题" />
        </Form.Item>

        <Form.Item label="SEO 描述" name={['seo', 'description']}>
          <Input.TextArea 
            placeholder="SEO 描述"
            rows={3}
          />
        </Form.Item>

        <Form.Item label="SEO 关键词" name={['seo', 'keywords']}>
          <Input placeholder="关键词，用英文逗号分隔" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
            block
          >
            保存页面信息
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default PageInfoEditor;