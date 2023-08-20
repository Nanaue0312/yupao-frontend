import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { showFailToast } from 'vant';
import { GET_SESSION } from '@/utils/token';
export const router = createRouter({
	history: createWebHistory(),
	routes,
});

const NO_AUTH_URL = [
	'/user/login',
	'/user/register',
	'/search',
	'/user/searchUser',
];
// @ts-ignore
router.beforeEach(async (to, from, next) => {
	if (NO_AUTH_URL.includes(to.path)) {
		next();
		console.log('放行', to.path);
		return;
	}
	try {
		if (GET_SESSION()) {
			// 如果一登陆则放行
			next();
		} else {
			// 如果没有登录
			showFailToast('请登录后再试!');
			next({
				path: '/user/login',
				query: {
					redirect: to.path,
				},
			});
		}
	} catch (error) {
		console.log('/user/current', error);
		showFailToast('获取用户信息失败,请重试!');
	}
});
/* router.beforeEach(async (to, from, next) => {
	if (NO_AUTH_URL.includes(to.path)) {
		next();
		return;
	}
	try {
		if (GET_SESSION()) {
			// 如果一登陆则放行
			next();
		} else {
			// 如果没有登录
			showFailToast('请登录后重试!');
			next({
				path: '/user/login',
				query: {
					redirect: to.path,
				},
			});
		}
	} catch (error) {
		console.log('/user/current', error);
		showFailToast('获取用户信息失败,请重试!');
	}
}); */
