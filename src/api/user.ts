import { request } from '@/plugins/request';
// @ts-ignore
import qs from 'qs';
import {
	SearchUserResponse,
	LoginUserResponse,
	RecommendUserResponse,
} from './types/user';

export enum Api {
	SEARCH_USER_BY_TAGS = '/user/search/tags',
	UPDATE_USER = '/user/update',
	USER_LOGIN = '/user/login',
	GET_CURRENT_USER = '/user/current',
	RECOMMEND_USER_LIST = '/user/recommend',
	MATCH_USER_LIST = '/user/match',
}
/**
 * 登录用户
 * @param data 用户账户,密码
 * @returns 登陆后的用户信息
 */
export const userLogin = (data: any) => {
	return request.post<any, LoginUserResponse>(Api.USER_LOGIN, data);
};
/**
 * 根据标签搜索用户
 * @param selectedTags 选中的用户标签
 * @returns 匹配的用户列表
 */
export const searchUserByTags = (selectedTags: string[]) => {
	return request.get<any, SearchUserResponse>(Api.SEARCH_USER_BY_TAGS, {
		params: {
			tagNameList: selectedTags,
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	});
};
/**
 * 更新用户信息
 * @param userId 用户id
 * @param attrKey 更新属性的key
 * @param attrValue 更新属性的value
 * @returns 是否更新成功
 */
export const updateUser = (
	userId: number,
	attrKey: string,
	attrValue: string
) => {
	return request.post(Api.UPDATE_USER, {
		[attrKey]: attrValue,
		id: userId,
	});
};
/**
 * 获取当前登录用户
 * @returns 当前登录用户
 */
export const getCurrentUser = () => {
	return request.get<any, LoginUserResponse>(Api.GET_CURRENT_USER);
};
/**
 * 获取推荐用户
 * @returns 推荐的用户列表
 */
export const getRecommendUserList = (pageNum: number, pageSize: number) => {
	return request.get<any, RecommendUserResponse>(Api.RECOMMEND_USER_LIST, {
		params: {
			pageNum,
			pageSize,
		},
	});
};
/**
 * 获取匹配用户
 * @param num 匹配数量
 * @returns 匹配值最高的用户
 */
export const getMatchUserList = (num: number) => {
	return request.get<any, SearchUserResponse>(Api.MATCH_USER_LIST, {
		params: {
			num,
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	});
};
