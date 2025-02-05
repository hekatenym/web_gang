export * from './common';
export * from './component';
export * from './page';
export * from './editor';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 