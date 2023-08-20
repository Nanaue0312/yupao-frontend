import { defineStore } from 'pinia';
import { userState } from './type';
import { GET_SESSION } from '@/utils/token';

export const useUserStore = defineStore('userStore', {
	state(): userState {
		return {
			user: GET_SESSION(),
		};
	},
	getters: {},
	actions: {},
});
