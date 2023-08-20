# 鱼泡——伙伴匹配系统前端

## 技术选型

- vant-ui
- vue3
- vite
- typtscript

## 页面组成

- 主页
- 加入的队伍页
- 用户页

## 整合路由

1. 创建router对象

```ts
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
export const router = createRouter({
	history: createWebHistory(),
	routes,
});
```

2. 配置路由规则

```ts
export const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/team',
		name: 'Team',
		component: () => import('@/views/team/index.vue'),
	},
	{
		path: '/user',
		name: 'User',
		component: () => import('@/views/user/index.vue'),
	},
];
```

> vue-router通过path来加载对应的component。

## 搜索页面

在修改标签对象数组前，通过**JSON.parse(JSON.stringify(initialTagList))**进行深拷贝，在每次搜索前，重新对tagList赋值
