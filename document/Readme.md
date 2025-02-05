首先确保 MongoDB 已经正确配置。检查 .env.local 文件：
```
MONGODB_URI=mongodb://localhost:27017/lowcode-platform
# 如果你使用MongoDB Atlas，使用类似下面的连接串
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lowcode-platform
```

安装依赖（如果还没安装）：
```
npm install antd @ant-design/icons react-beautiful-dnd dayjs
```

启动开发服务器：
```
npm run dev
```

访问以下路径测试功能：
页面列表：http://localhost:3000/admin/pages
创建新页面后，编辑器地址：http://localhost:3000/admin/editor/[页面ID]