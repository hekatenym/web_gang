import React from 'react';
import { ComponentType, ComponentRegistration } from '@/types/component';
import { PictureOutlined } from '@ant-design/icons';
import Image from './Image';

export const ImageConfig: ComponentRegistration = {
  type: ComponentType.IMAGE,
  title: '图片',
  icon: React.createElement(PictureOutlined),
  component: Image,
  defaultProps: {
    style: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    data: {
      src: 'https://via.placeholder.com/400x200',
      alt: '示例图片',
    },
  },
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
}; 