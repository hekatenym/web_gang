import React from 'react';
import { ComponentType, ComponentRegistration } from '@/types/component';
import { FormOutlined } from '@ant-design/icons';
import Button from './Button';

export const ButtonConfig: ComponentRegistration = {
  type: ComponentType.BUTTON,
  title: '按钮',
  icon: React.createElement(FormOutlined),
  component: Button,
  defaultProps: {
    style: {
      width: 'auto',
      padding: { top: 4, right: 12, bottom: 4, left: 12 },
      backgroundColor: '#1677ff',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
    },
    data: {
      text: '按钮',
      link: '#',
    },
  },
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
        label: '圆角',
        type: 'number',
        field: 'borderRadius',
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 6,
      },
      {
        label: '内边距',
        type: 'space',
        field: 'padding',
        min: 0,
        max: 40,
        step: 4,
        defaultValue: { top: 4, right: 12, bottom: 4, left: 12 },
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
}; 