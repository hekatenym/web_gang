import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function errorHandler(error: unknown) {
  console.error(error);
  
  if (error instanceof ApiError) {
    return NextResponse.json<ApiResponse>(
      {
        code: error.statusCode,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  return NextResponse.json<ApiResponse>(
    {
      code: 500,
      message: 'Internal Server Error',
    },
    { status: 500 }
  );
}

export function successResponse<T>(data?: T, message = 'Success'): ApiResponse<T> {
  return {
    code: 200,
    message,
    data,
  };
}