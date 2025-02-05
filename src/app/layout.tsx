import { Inter } from 'next/font/google';
import { ConfigProvider, App as AntdApp } from 'antd';
import { theme } from '@/theme/antd.config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '页面构建器',
  description: '可视化页面构建工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <AntdApp>
            {children}
          </AntdApp>
        </ConfigProvider>
      </body>
    </html>
  );
}
