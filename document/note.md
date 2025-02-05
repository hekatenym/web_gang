# Redux 使用目的
根据技术设计文档中的状态管理设计部分（参考 document/技术设计.md 第 83-109 行），使用 Redux 的主要目的是：
- 页面管理状态
- 管理页面列表数据
- 当前编辑页面的状态
- 页面配置信息
- 编辑器状态
- 选中组件的状态
- 剪贴板数据
- 操作历史记录（撤销/重做）

使用示例
```
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentPage } from '@/store/slices/pagesSlice';

// 在组件中使用
const currentPage = useAppSelector(state => state.pages.currentPage);
const dispatch = useAppDispatch();

// 修改状态
dispatch(setCurrentPage(newPage));
```

API 路由的基础设置，主要包括：
API 响应类型定义
统一的错误处理
页面 CRUD 的 API 路由
API 客户端工具
使用示例：

```typescript
// 在组件中使用
import { apiClient } from '@/lib/api-client';

// 获取页面列表
const getPages = async () => {
  try {
    const response = await apiClient.getPages(1, 10);
    // 处理响应数据
  } catch (error) {
    // 处理错误
  }
};

// 创建页面
const createPage = async (pageData: any) => {
  try {
    const response = await apiClient.createPage(pageData);
    // 处理响应
  } catch (error) {
    // 处理错误
  }
};
```


## 工具函数
这些工具函数提供了：
1. 通用工具：
ID生成
深拷贝
防抖/节流
组件工具：
组件创建
组件查找
组件更新
页面工具：
页面创建
路由验证
路由格式化
编辑器工具：
位置计算
拖放验证
历史记录
使用示例：
;


```typescript
import { 
  createComponent,
  updateComponentStyle,
  createPage,
  validateRoute 
} from '@/lib/utils';

// 创建新组件
const textComponent = createComponent('text', {
  style: { color: 'black' },
  data: { text: 'Hello' }
});

// 更新组件样式
const updatedComponent = updateComponentStyle(textComponent, {
  fontSize: '16px'
});

// 创建新页面
const page = createPage('Home', '/home');

// 验证路由
const isValidRoute = validateRoute('/about-us');
``` 

这些工具函数将帮助我们在整个项目中保持代码的一致性和可重用性。你可以根据项目的发展继续扩展这些工具函数。
