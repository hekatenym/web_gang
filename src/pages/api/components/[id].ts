import { NextApiRequest, NextApiResponse } from 'next';
import { Component } from '@/models/component.model';
import { connectDB } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const component = await Component.findById(id);
        if (!component) {
          return res.status(404).json({ error: '组件不存在' });
        }
        return res.status(200).json(component);
      } catch (error) {
        return res.status(500).json({ error: '获取组件失败' });
      }

    case 'PUT':
      try {
        const updatedComponent = await Component.findByIdAndUpdate(
          id,
          { ...req.body, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
        if (!updatedComponent) {
          return res.status(404).json({ error: '组件不存在' });
        }
        return res.status(200).json(updatedComponent);
      } catch (error) {
        return res.status(500).json({ error: '更新组件失败' });
      }

    case 'DELETE':
      try {
        const deletedComponent = await Component.findByIdAndDelete(id);
        if (!deletedComponent) {
          return res.status(404).json({ error: '组件不存在' });
        }
        return res.status(200).json({ message: '组件删除成功' });
      } catch (error) {
        return res.status(500).json({ error: '删除组件失败' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `不支持 ${req.method} 方法` });
  }
} 