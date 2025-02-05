import { useState, useEffect } from 'react';
import { Layout, Button, Table, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { PageInfoEditor } from '@/components/editor/PageInfoEditor';
import { createPage } from '@/lib/api/pages';
import type { IPage } from '@/models/page.model';

const { Content } = Layout;

interface CreatePageData {
  title: string;
  route: string;
  slug: string;
  description: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export default function PagesListPage() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<IPage[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  // 表格列配置
  const columns = [
    {
      title: '页面标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '路由',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: IPage) => (
        <Button 
          type="link" 
          onClick={() => router.push(`/admin/editor/${record._id}`)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // 获取页面列表
  const fetchPages = async () => {
    try {
      setTableLoading(true);
      const response = await fetch('/api/pages');
      if (!response.ok) {
        throw new Error('获取页面列表失败');
      }
      const data = await response.json();
      // 从返回的数据结构中获取 pages 数组
      setPages(Array.isArray(data.pages) ? data.pages : []);
    } catch (error) {
      message.error('获取页面列表失败');
      setPages([]); // 出错时设置为空数组
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // 处理创建页面
  const handleCreatePage = async (values: Partial<CreatePageData>) => {
    try {
      setLoading(true);
      // 补充必要字段
      const pageData = {
        ...values,
        slug: values.route?.replace(/^\//, '') || '', // 移除开头的斜杠作为 slug
        description: values.description || values.title || '', // 使用标题作为默认描述
        createdBy: 'system', // 临时使用固定值
      };

      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });
      
      if (response.ok) {
        message.success('创建成功');
        setIsModalVisible(false);
        fetchPages();
      } else {
        const error = await response.json();
        throw new Error(error.details || '创建失败');
      }
    } catch (error: any) {
      message.error(`创建页面失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">页面管理</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            新建页面
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={pages}
          rowKey="_id"
          loading={tableLoading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />

        <Modal
          title="创建新页面"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          <PageInfoEditor
            onSubmit={handleCreatePage}
            loading={loading}
          />
        </Modal>
      </Content>
    </Layout>
  );
} 