'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import { theme } from '@/theme/antd.config';

// Antd 主题配置
const themeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
  components: {
    Button: {
      // 按钮圆角
      borderRadius: 4,
    },
    Card: {
      // 卡片圆角
      borderRadius: 8,
    },
  },
};

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

export function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return (
    <ConfigProvider theme={themeConfig}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export default AntdConfigProvider;