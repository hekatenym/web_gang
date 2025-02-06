import React from 'react';
import { ComponentType, ComponentRegistration } from '@/types/component';
import { ContainerOutlined } from '@ant-design/icons';
import Container from './Container';

export const ContainerConfig: ComponentRegistration = {
  type: ComponentType.CONTAINER,
  title: '容器',
  icon: React.createElement(ContainerOutlined),
  component: Container,
  defaultProps: {
    style: {
      width: '100%',
      minHeight: '100px',
      padding: '20px',
      backgroundColor: '#ffffff',
      border: '1px dashed #d9d9d9',
    },
    data: {
      direction: 'vertical',
      wrap: false,
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
}; 