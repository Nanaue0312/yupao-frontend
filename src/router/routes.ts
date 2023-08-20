export const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			title: '主页',
		},
	},
	{
		path: '/team',
		name: 'Team',
		component: () => import('@/views/team/index.vue'),
		meta: {
			title: '队伍列表',
		},
	},
	{
		path: '/team/join',
		name: 'JoinTeam',
		component: () => import('@/views/team/createTeam.vue'),
	},
	{
		path: '/team/update',
		name: 'UpdateTeam',
		component: () => import('@/views/team/updateTeam.vue'),
		meta: {
			title: '更新队伍',
		},
	},
	{
		path: '/user',
		name: 'User',
		component: () => import('@/views/user/index.vue'),
		meta: {
			title: '关于',
		},
	},
	{
		path: '/user/info',
		name: 'UserInfo',
		component: () => import('@/views/user/userInfo.vue'),
		meta: {
			title: '用户信息',
		},
	},
	{
		path: '/user/edit',
		name: 'UserEdit',
		component: () => import('@/views/userEdit/index.vue'),
	},
	{
		path: '/user/searchUser',
		name: 'SearchUser',
		component: () => import('@/views/searchResult/index.vue'),
		props: (route: any) => ({ selectedTags: route.query.selectedTags }),
		meta: {
			title: '搜索结果',
		},
	},
	{
		path: '/user/login',
		name: 'UserLogin',
		component: () => import('@/views/userLogin/index.vue'),
		props: (route: any) => ({ selectedTags: route.query.selectedTags }),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/user/team/created',
		name: 'UserCreatedTeam',
		component: () => import('@/views/user/userCreatedTeam.vue'),
		meta: {
			title: '我创建的队伍',
		},
	},
	{
		path: '/user/team/joined',
		name: 'UserJoinedTeam',
		component: () => import('@/views/user/userJoinedTeam.vue'),
		meta: {
			title: '我加入的队伍',
		},
	},
	{
		path: '/search',
		name: 'Search',
		component: () => import('@/views/search/index.vue'),
		meta: {
			title: '搜索标签',
		},
	},
];
