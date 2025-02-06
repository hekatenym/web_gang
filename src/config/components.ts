import { ComponentType, ComponentRegistration } from '@/types/component';
import { componentConfigs } from '@/components/editor/components';

// 获取组件配置
export function getComponentConfig(type: ComponentType): ComponentRegistration | undefined {
  return componentConfigs[type];
}

// 获取可用组件列表
export function getAvailableComponents(): ComponentRegistration[] {
  return Object.values(componentConfigs);
}