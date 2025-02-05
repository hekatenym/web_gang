import React from 'react';
import {
  FontSizeOutlined,
  PictureOutlined,
  FormOutlined
} from '@ant-design/icons';
import { ComponentType, ComponentDefinition } from '@/types/component';

export const componentDefinitions: Record<string, ComponentDefinition> = {
  [ComponentType.TEXT]: {
    type: ComponentType.TEXT,
    title: '文本',
    icon: React.createElement(FontSizeOutlined),
    defaultProps: {
      style: {
        width: '100%',
        padding: '12px',
        fontSize: '14px',
        color: '#333',
      },
      data: {
        text: '点击编辑文本'
      }
    }
  },
  [ComponentType.IMAGE]: {
    type: ComponentType.IMAGE,
    title: '图片',
    icon: React.createElement(PictureOutlined),
    defaultProps: {
      style: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
      },
      data: {
        src: 'https://via.placeholder.com/400x200',
        alt: '示例图片'
      }
    }
  },
  [ComponentType.BUTTON]: {
    type: ComponentType.BUTTON,
    title: '按钮',
    icon: React.createElement(FormOutlined),
    defaultProps: {
      style: {
        width: 'auto',
        padding: '4px 15px',
        backgroundColor: '#1677ff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      },
      data: {
        text: '按钮',
        link: '#'
      }
    }
  }
};

// 组件配置
export const componentConfigs = {
  [ComponentType.TEXT]: {
    editors: {
      style: [
        {
          label: '字体颜色',
          type: 'color',
          field: 'color',
        },
        {
          label: '字体大小',
          type: 'number',
          field: 'fontSize',
          min: 12,
          max: 72,
          step: 1,
        },
        {
          label: '对齐方式',
          type: 'select',
          field: 'textAlign',
          options: [
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' },
          ],
        },
      ],
      data: [
        {
          label: '文本内容',
          type: 'text',
          field: 'text',
        },
      ],
    },
  },
  [ComponentType.IMAGE]: {
    editors: {
      style: [
        {
          label: '宽度',
          type: 'text',
          field: 'width',
        },
        {
          label: '高度',
          type: 'text',
          field: 'height',
        },
        {
          label: '填充方式',
          type: 'select',
          field: 'objectFit',
          options: [
            { label: '填充', value: 'fill' },
            { label: '包含', value: 'contain' },
            { label: '覆盖', value: 'cover' },
            { label: '无', value: 'none' },
          ],
        },
      ],
      data: [
        {
          label: '图片地址',
          type: 'text',
          field: 'src',
        },
        {
          label: '替代文本',
          type: 'text',
          field: 'alt',
        },
      ],
    },
  },
  [ComponentType.CONTAINER]: {
    editors: {
      style: [
        {
          label: '背景颜色',
          type: 'color',
          field: 'backgroundColor',
        },
        {
          label: '内边距',
          type: 'number',
          field: 'padding',
          min: 0,
          max: 100,
          step: 4,
        },
        {
          label: '最小高度',
          type: 'number',
          field: 'minHeight',
          min: 0,
          step: 10,
        },
        {
          label: '边框',
          type: 'select',
          field: 'border',
          options: [
            { label: '无', value: 'none' },
            { label: '实线', value: '1px solid #d9d9d9' },
            { label: '虚线', value: '1px dashed #d9d9d9' },
          ],
        },
      ],
      data: [
        {
          label: '排列方向',
          type: 'select',
          field: 'direction',
          options: [
            { label: '垂直排列', value: 'vertical' },
            { label: '水平排列', value: 'horizontal' },
          ],
        },
        {
          label: '允许换行',
          type: 'switch',
          field: 'wrap',
        },
      ],
    },
  },
  [ComponentType.BUTTON]: {
    editors: {
      style: [
        {
          label: '背景颜色',
          type: 'color',
          field: 'backgroundColor',
        },
        {
          label: '文字颜色',
          type: 'color',
          field: 'color',
        },
        {
          label: '边框圆角',
          type: 'number',
          field: 'borderRadius',
          min: 0,
          max: 20,
          step: 1,
        },
      ],
      data: [
        {
          label: '按钮文本',
          type: 'text',
          field: 'text',
        },
        {
          label: '链接地址',
          type: 'text',
          field: 'link',
        },
      ],
    },
  },
};
