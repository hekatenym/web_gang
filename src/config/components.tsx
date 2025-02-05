import { ComponentDefinition } from '@/types/component';
import { TextIcon, ImageIcon, ButtonIcon, ContainerIcon, NavigationIcon } from 'lucide-react';
import { Text, Image, Button, Container, Navigation } from '@/components/editor/components';

export const componentDefinitions: Record<string, ComponentDefinition> = {
  text: {
    type: 'text',
    label: '文本',
    icon: <TextIcon className="w-4 h-4" />,
    component: Text,
    defaultProps: {
      style: {
        padding: '12px',
      },
      data: {
        text: '点击编辑文本',
      },
    },
    propTypes: [
      {
        name: 'text',
        label: '文本内容',
        type: 'string',
      },
    ],
  },
  image: {
    type: 'image',
    label: '图片',
    icon: <ImageIcon className="w-4 h-4" />,
    component: Image,
    defaultProps: {
      style: {
        width: '100%',
      },
      data: {
        src: '',
        alt: '',
      },
    },
    propTypes: [
      {
        name: 'src',
        label: '图片地址',
        type: 'string',
      },
      {
        name: 'alt',
        label: '替代文本',
        type: 'string',
      },
    ],
  },
  button: {
    type: 'button',
    label: '按钮',
    icon: <ButtonIcon className="w-4 h-4" />,
    component: Button,
    defaultProps: {
      style: {},
      data: {
        text: '按钮',
        type: 'primary',
      },
    },
    propTypes: [
      {
        name: 'text',
        label: '按钮文本',
        type: 'string',
      },
      {
        name: 'type',
        label: '按钮类型',
        type: 'select',
        options: [
          { label: '主要', value: 'primary' },
          { label: '次要', value: 'secondary' },
          { label: '文本', value: 'text' },
        ],
      },
    ],
  },
  container: {
    type: 'container',
    label: '容器',
    icon: <ContainerIcon className="w-4 h-4" />,
    component: Container,
    defaultProps: {
      style: {
        padding: '20px',
        minHeight: '100px',
      },
      data: {},
    },
    propTypes: [],
  },
  navigation: {
    type: 'navigation',
    label: '导航',
    icon: <NavigationIcon className="w-4 h-4" />,
    component: Navigation,
    defaultProps: {
      style: {},
      data: {
        items: [
          { text: '首页', href: '/' },
          { text: '关于', href: '/about' },
        ],
      },
    },
    propTypes: [
      {
        name: 'items',
        label: '导航项',
        type: 'array',
        itemType: {
          text: { type: 'string', label: '文本' },
          href: { type: 'string', label: '链接' },
        },
      },
    ],
  },
}; 