/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/cssinjs',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
    '@ant-design/icons-svg',
    '@ant-design/pro-components',
    '@ant-design/pro-layout',
    '@ant-design/pro-utils',
    'rc-menu',
    'rc-motion',
    'react-beautiful-dnd'
  ],
  webpack: (config) => {
    // 处理 .js 扩展名问题
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx']
    }
    
    // 添加模块解析规则
    config.resolve.extensions = [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      ...(config.resolve.extensions || [])
    ]

    // 更新别名配置，强制使用 lib 目录
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ant-design/icons/es': '@ant-design/icons/lib',
      '@ant-design/cssinjs/es': '@ant-design/cssinjs/lib',
      'rc-util/es': 'rc-util/lib',
      'rc-util/lib/hooks/useMemo': 'rc-util/lib/hooks/useMemo',
      'rc-util/lib/hooks/useState': 'rc-util/lib/hooks/useState',
      'rc-motion/es': 'rc-motion/lib',
      'rc-trigger/es': 'rc-trigger/lib',
      'rc-tooltip/es': 'rc-tooltip/lib',
      'rc-dropdown/es': 'rc-dropdown/lib',
      'rc-menu/es': 'rc-menu/lib',
      'rc-tree/es': 'rc-tree/lib',
      'rc-table/es': 'rc-table/lib',
      'rc-pagination/es': 'rc-pagination/lib',
      'rc-field-form/es': 'rc-field-form/lib',
      'rc-input/es': 'rc-input/lib',
      'rc-select/es': 'rc-select/lib'
    }

    return config
  }
}

module.exports = nextConfig