import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    '@ant-design/icons-svg',
    '@ant-design/pro-components',
    '@ant-design/pro-layout',
    '@ant-design/pro-utils',
    'rc-menu',
    'rc-motion'
  ],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx']
    }
    return config
  }
}

export default nextConfig 