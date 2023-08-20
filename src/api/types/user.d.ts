import { User } from '@/model/user';
export interface CommonResponse {
	code: number;
	description: string;
	msg: string;
}

export interface SearchUserResponse extends CommonResponse {
	data: User[];
}
export interface LoginUserResponse extends CommonResponse {
	data: User;
}
export interface RecommendUserResponse extends CommonResponse {
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
		records: User[];
		searchCount: true;
		size: number;
		total: number;
	};
}
