# 页面可视化编辑器

一个基于 React + Next.js 的可视化页面编辑器，支持组件拖拽、属性编辑、实时预览等功能。

## 技术栈

- React 18
- Next.js 14
- Redux Toolkit
- Ant Design
- @hello-pangea/dnd
- MongoDB

## 主要功能

- ✅ 组件拖拽
- ✅ 属性编辑
- ✅ 实时预览
- ✅ 自动保存
- ✅ 组件删除
- 🚧 组件嵌套
- 🚧 撤销/重做
- 🚧 响应式预览

## 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```
编辑 .env.local 文件，填入必要的环境变量。

4. 启动开发服务器
```bash
npm run dev
```

## 项目结构

```
src/
├── app/          # Next.js 路由
├── components/   # React 组件
├── config/       # 配置文件
├── store/        # Redux store
├── services/     # API 服务
├── lib/          # 工具函数
└── types/        # TypeScript 类型定义
```

## 部署

项目可以部署到 Vercel：

1. Fork 这个仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

MIT
