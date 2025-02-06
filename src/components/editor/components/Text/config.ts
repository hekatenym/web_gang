import React from 'react';
import { ComponentType, ComponentRegistration } from '@/types/component';
import { FontSizeOutlined } from '@ant-design/icons';
import Text from './Text';

export const TextConfig: ComponentRegistration = {
  type: ComponentType.TEXT,
  title: '文本',
  icon: React.createElement(FontSizeOutlined),
  component: Text,
  defaultProps: {
    style: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      color: '#333',
    },
    data: {
      text: '点击编辑文本',
    },
  },
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
}; 