import { NextApiRequest, NextApiResponse } from 'next';
import { Page } from '@/models/page.model';
import { connectDB } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, status, search } = req.query;
        
        // 构建查询条件
        const query: any = {};
        if (status) query.status = status;
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }

        // 执行分页查询
        const pages = await Page.find(query)
          .sort({ createdAt: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit));

        // 获取总数
        const total = await Page.countDocuments(query);

        return res.status(200).json({
          pages,
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit))
        });
      } catch (error) {
        console.error('获取页面列表失败:', error);
        return res.status(500).json({ error: '获取页面列表失败' });
      }

    case 'POST':
      try {
        // 验证 slug 是否已存在
        const existingPage = await Page.findOne({ slug: req.body.slug });
        if (existingPage) {
          return res.status(400).json({ error: '页面路径已存在' });
        }

        // 创建新页面
        const pageData = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        console.log('创建页面数据:', pageData);

        const newPage = await Page.create(pageData);
        console.log('创建成功:', newPage);

        return res.status(201).json(newPage);
      } catch (error) {
        console.error('创建页面失败:', error);
        return res.status(500).json({ 
          error: '创建页面失败',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `不支持 ${req.method} 方法` });
  }
} 