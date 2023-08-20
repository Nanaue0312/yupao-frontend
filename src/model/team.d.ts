import { User } from './user';

/**
 * 队伍类型
 */
export type Team = {
	id?: number;
	description?: string;
	expireTime?: string;
	maxCount?: number;
	name?: string;
	password?: string;
	status?: numb;
	createTime?: string;
	updateTime?: string;
	createUser?: User;
	showPopover?: boolean;
	isJoined?: boolean;
	joinedCount?: number;
};
