/**
 * 保存当前登录用户
 * @param user 当前登录用户信息
 */
export const SET_SESSION = (user: any) => {
	sessionStorage.setItem('user', user);
};
/**
 * 获取当前登录用户信息
 * @returns 当前登录用户信息
 */
export const GET_SESSION = () => {
	return sessionStorage.getItem('user');
};
/**
 * 删除登录信息
 */
export const REMOVE_SESSION = () => {
	sessionStorage.removeItem('user');
};
