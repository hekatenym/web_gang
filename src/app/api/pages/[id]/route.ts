import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// 添加错误处理中间件
async function withErrorHandling(fn: () => Promise<NextResponse>) {
  try {
    return await fn();
  } catch (error) {
    console.error('API Error:', error);
    
    // 更详细的错误信息
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Internal server error';
      
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' 
          ? error instanceof Error ? error.stack : null
          : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async () => {
    const { db } = await connectToDatabase();
    
    try {
      const page = await db.collection('pages').findOne({
        _id: new ObjectId(params.id)
      });

      if (!page) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        );
      }

      // 确保组件数组存在且有效
      if (!Array.isArray(page.components)) {
        page.components = [];
      } else {
        page.components = page.components.filter(comp => comp != null);
      }

      console.log('API: Found page:', {
        id: page._id,
        componentsCount: page.components.length,
        components: page.components
      });

      return NextResponse.json(page);
    } catch (error) {
      if (error instanceof Error && error.message.includes('ObjectId')) {
        return NextResponse.json(
          { error: 'Invalid page ID' },
          { status: 400 }
        );
      }
      throw error;
    }
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async () => {
    const { db } = await connectToDatabase();
    const data = await request.json();

    try {
      console.log('Updating page with data:', {
        id: params.id,
        data: JSON.stringify(data)
      });

      // 验证并规范化数据，移除 _id 字段
      const { _id, ...dataWithoutId } = data;
      const updateData = {
        ...dataWithoutId,
        updatedAt: new Date()
      };

      // 确保组件数据的完整性
      if (Array.isArray(data.components)) {
        updateData.components = data.components.map(comp => {
          if (!comp) return null;
          
          return {
            id: comp.id || generateId(),
            type: comp.type || 'text',
            props: {
              style: comp.props?.style || {},
              data: comp.props?.data || {}
            }
          };
        }).filter(Boolean);
      }

      // 使用 findOneAndUpdate 而不是 updateOne
      const result = await db.collection('pages').findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $set: updateData },
        { 
          returnDocument: 'after',
          upsert: false // 不创建新文档
        }
      );

      if (!result) {
        console.log('Page not found for update');
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        );
      }

      console.log('Successfully updated page:', {
        id: result._id,
        componentsCount: result.components?.length
      });

      return NextResponse.json(result);
    } catch (error) {
      console.error('Error updating page:', error);
      
      // 更详细的错误处理
      if (error instanceof Error) {
        if (error.message.includes('ObjectId')) {
          return NextResponse.json(
            { error: 'Invalid page ID' },
            { status: 400 }
          );
        }
        
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
      
      throw error;
    }
  });
} 