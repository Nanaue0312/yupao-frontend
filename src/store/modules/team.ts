import { defineStore } from 'pinia';
import { teamState } from './type';

export const useTeamStore = defineStore('teamStore', {
	state(): teamState {
		return {
			team: {},
		};
	},
	actions: {},
	getters: {},
});
