import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // 自定义主题变量
    colorPrimary: '#1677ff',
    borderRadius: 6,
    colorBgLayout: '#f5f5f5',
    boxShadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  },
  components: {
    Layout: {
      headerBg: '#e6f4ff',
      headerHeight: 56,
      headerPadding: '0 24px',
    }
  },
  // 移除样式隔离前缀
  cssVar: true,
  // 或者自定义前缀
  prefixCls: 'editor'
}; 