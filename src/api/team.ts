import { request } from '@/plugins/request';
// @ts-ignore
import qs from 'qs';
import {
	CreateTeamRequest,
	CreateTeamResponse,
	JoinTeamResponse,
	ListTeamByPageResponse,
	ListTeamResponse,
	UpdateTeamResponse,
} from './types/team';
import { Team } from '@/model/team';

enum Api {
	CREATE_TEAM = '/team',
	LIST_TEAM = '/team/list',
	LIST_TEAM_PAGE = '/team/list/page',
	JOIN_TEAM = '/team/join',
	UPDATE_TEAM = '/team',
	LIST_CREATED_TEAM = '/team/list/my',
	LIST_JOINED_TEAM = '/team/list/joined',
	QUIT_TEAM = '/team/quit',
	DELETE_TEAM = '/team',
}
/**
 * 创建队伍
 * @param data 队伍信息
 * @returns promise
 */
export const createTeam = (data: CreateTeamRequest) => {
	return request.post<any, CreateTeamResponse>(Api.CREATE_TEAM, data);
};

/**
 * 查询队伍列表
 * @param data 查询信息
 * @returns promise
 */
export const listTeam = (data?: any) => {
	return request.get<any, ListTeamResponse>(Api.LIST_TEAM, {
		params: {
			searchText: data,
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	});
};

/**
 * 分页查询队伍列表
 * @param data 查询信息
 * @returns promise
 */
export const listTeamByPage = (data?: any) => {
	return request.get<any, ListTeamByPageResponse>(Api.LIST_TEAM_PAGE, {
		params: {
			searchText: data,
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	});
};

/**
 * 查询用户创建的队伍
 * @returns 用户创建的队伍
 */
export const listCreatedTeam = () => {
	return request.get<any, ListTeamResponse>(Api.LIST_CREATED_TEAM);
};

/**
 * 查询用户创建的队伍
 * @returns 用户创建的队伍
 */
export const listJoinedTeam = () => {
	return request.get<any, ListTeamResponse>(Api.LIST_JOINED_TEAM);
};

/**
 * 加入队伍
 * @param data 队伍id、用户id
 * @returns promise
 */
export const joinTeam = (data: any) => {
	return request.post<any, JoinTeamResponse>(Api.JOIN_TEAM, data);
};
/**
 * 更新队伍信息
 * @param team 更新后的队伍信息
 * @returns promise
 */
export const updateTeam = (team: Team) => {
	return request.put<any, UpdateTeamResponse>(Api.UPDATE_TEAM, team);
};
/**
 * 退出退伍
 * @param data 队伍id
 * @returns 是否成功
 */
export const quitTeam = (data: any) => {
	return request.post(Api.QUIT_TEAM, data);
};
/**
 * 解散退伍
 * @param data 队伍id
 * @returns 是否成功
 */
export const deleteTeam = (teamId: number) => {
	return request.delete(Api.DELETE_TEAM, {
		params: {
			teamId,
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: 'repeat' });
		},
	});
};
