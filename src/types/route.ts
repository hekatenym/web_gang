import { NextRequest, NextResponse } from 'next/server';
import { ApiError, errorHandler, successResponse } from '@/lib/api-utils';
import { connectToDatabase } from '@/lib/db';
import { PaginatedResponse, PageCreateInput } from '@/types/api';

// GET /api/pages
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    await connectToDatabase();
    // TODO: 实现分页查询逻辑
    
    return NextResponse.json<PaginatedResponse<any>>(
      successResponse({
        items: [],
        total: 0,
        page,
        pageSize,
      })
    );
  } catch (error) {
    return errorHandler(error);
  }
}

// POST /api/pages
export async function POST(request: NextRequest) {
  try {
    const body: PageCreateInput = await request.json();
    
    if (!body.title || !body.route) {
      throw new ApiError(400, 'Title and route are required');
    }
    
    await connectToDatabase();
    // TODO: 实现创建页面逻辑
    
    return NextResponse.json(
      successResponse(null, 'Page created successfully')
    );
  } catch (error) {
    return errorHandler(error);
  }
}
