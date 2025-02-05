import { Position, CanvasConfig } from '@/types/editor';
import { Component } from '@/types/component';

/**
 * 计算画布中的实际位置
 */
export function calculateRealPosition(
  position: Position,
  config: CanvasConfig
): Position {
  return {
    x: Math.round(position.x / config.gridSize) * config.gridSize,
    y: Math.round(position.y / config.gridSize) * config.gridSize,
  };
}

/**
 * 检查组件是否可以放置在目标位置
 */
export function canDropComponent(
  source: Component,
  target: Component | null,
  position: Position
): boolean {
  // 如果没有目标，说明是放置在画布上
  if (!target) return true;
  
  // 检查目标组件是否允许包含子组件
  if (!target.children) return false;
  
  // 可以在这里添加更多的验证逻辑
  // 例如：检查嵌套层级、检查组件类型兼容性等
  
  return true;
}

/**
 * 创建历史记录快照
 */
export function createHistorySnapshot(components: Component[]): Component[] {
  return JSON.parse(JSON.stringify(components));
} 