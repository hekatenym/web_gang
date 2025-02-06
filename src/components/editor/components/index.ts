import { ComponentType } from '@/types/component';
import Text from './Text/Text';
import Image from './Image/Image';
import Button from './Button/Button';
import Container from './Container/Container';

import { TextConfig } from './Text/config';
import { ImageConfig } from './Image/config';
import { ButtonConfig } from './Button/config';
import { ContainerConfig } from './Container/config';

// 导出组件
export {
  Text,
  Image,
  Button,
  Container,
};

// 导出配置
export const componentConfigs = {
  [ComponentType.TEXT]: TextConfig,
  [ComponentType.IMAGE]: ImageConfig,
  [ComponentType.BUTTON]: ButtonConfig,
  [ComponentType.CONTAINER]: ContainerConfig,
};

// 导出类型
export type { default as TextProps } from './Text/Text';
export type { default as ImageProps } from './Image/Image';
export type { default as ButtonProps } from './Button/Button';
export type { default as ContainerProps } from './Container/Container'; 