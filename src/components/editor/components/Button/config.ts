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
      padding: '4px 15px',
      backgroundColor: '#1677ff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
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