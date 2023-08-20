import { Team } from '@/model/team';
import { User } from '@/model/user';

export interface CreateTeamRequest {
	description: string;
	expireTime: string;
	maxCount: number;
	name: string;
	password: string;
	status: number;
}

export interface CommonResponse {
	code: number;
	description: string;
	msg: string;
}
export interface CreateTeamResponse extends CommonResponse {
	data: number;
}

export interface ListTeamResponse extends CommonResponse {
	data: [
		{
			createTime: string;
			createUser: User;
			description: string;
			expireTime: string;
			id: number;
			maxCount: number;
			name: string;
			status: number;
			updateTime: string;
			userId: number;
			isJoined: boolean;
		}
	];
}

export interface ListTeamByPageResponse extends CommonResponse {
	data: {
		countId: string;
		current: number;
		maxLimit: number;
		optimizeCountSql: boolean;
		orders: [
			{
				asc: boolean;
				column: string;
			}
		];
		pages: number;
		records: Team[];
		searchCount: boolean;
		size: number;
		total: number;
	};
}

export interface JoinTeamResponse extends CommonResponse {
	data: true;
}
export interface UpdateTeamResponse extends CommonResponse {
	data: true;
}
