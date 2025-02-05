import { Page, SEO } from '@/types/page';
import { generateId } from './common';

/**
 * 创建新页面
 */
export function createPage(
  title: string,
  route: string,
  seo?: Partial<SEO>
): Page {
  return {
    id: generateId(),
    title,
    route,
    seo: {
      title: seo?.title || title,
      description: seo?.description || '',
      keywords: seo?.keywords || '',
    },
    components: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * 验证路由格式
 */
export function validateRoute(route: string): boolean {
  // 路由必须以 / 开头
  if (!route.startsWith('/')) return false;
  
  // 路由只能包含字母、数字、-、/
  const validPattern = /^[a-zA-Z0-9\-\/]+$/;
  return validPattern.test(route);
}

/**
 * 格式化路由
 */
export function formatRoute(route: string): string {
  // 确保以 / 开头
  let formatted = route.startsWith('/') ? route : `/${route}`;
  
  // 移除结尾的 /（除非是根路由）
  if (formatted.length > 1 && formatted.endsWith('/')) {
    formatted = formatted.slice(0, -1);
  }
  
  // 转换为小写
  return formatted.toLowerCase();
} 