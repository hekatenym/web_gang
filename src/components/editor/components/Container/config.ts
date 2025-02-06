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
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      backgroundColor: '#ffffff',
      border: '1px dashed #d9d9d9',
      display: 'flex',
      gap: 12,
    },
    data: {
      direction: 'vertical',
      wrap: false,
      justify: 'flex-start',
      align: 'flex-start',
    },
  },
  editors: {
    style: [
      {
        label: '宽度',
        type: 'select',
        field: 'width',
        options: [
          { label: '100%', value: '100%' },
          { label: '自适应', value: 'auto' },
          { label: '50%', value: '50%' },
          { label: '33.33%', value: '33.33%' },
          { label: '25%', value: '25%' },
        ],
      },
      {
        label: '背景颜色',
        type: 'color',
        field: 'backgroundColor',
      },
      {
        label: '内边距',
        type: 'space',
        field: 'padding',
        min: 0,
        max: 100,
        step: 4,
        defaultValue: { top: 20, right: 20, bottom: 20, left: 20 },
      },
      {
        label: '最小高度',
        type: 'select',
        field: 'minHeight',
        options: [
          { label: '100px', value: '100px' },
          { label: '200px', value: '200px' },
          { label: '300px', value: '300px' },
          { label: '自适应', value: 'auto' },
        ],
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
      {
        label: '间距',
        type: 'select',
        field: 'gap',
        options: [
          { label: '无间距', value: 0 },
          { label: '小间距', value: 8 },
          { label: '中等间距', value: 16 },
          { label: '大间距', value: 24 },
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
        label: '换行方式',
        type: 'select',
        field: 'wrap',
        options: [
          { label: '不换行', value: false },
          { label: '自动换行', value: true },
        ],
      },
      {
        label: '主轴对齐',
        type: 'select',
        field: 'justify',
        options: [
          { label: '起始对齐', value: 'flex-start' },
          { label: '居中对齐', value: 'center' },
          { label: '末尾对齐', value: 'flex-end' },
          { label: '两端对齐', value: 'space-between' },
          { label: '均匀分布', value: 'space-around' },
        ],
      },
      {
        label: '交叉轴对齐',
        type: 'select',
        field: 'align',
        options: [
          { label: '起始对齐', value: 'flex-start' },
          { label: '居中对齐', value: 'center' },
          { label: '末尾对齐', value: 'flex-end' },
          { label: '拉伸对齐', value: 'stretch' },
        ],
      },
    ],
  },
}; 