import { NextApiRequest, NextApiResponse } from 'next';
import { Component } from '@/server/models/component.model';
import { connectToDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const components = await Component.find();
        res.status(200).json(components);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch components' });
      }
      break;
      
    // 其他 HTTP 方法处理...
    
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
} 