<template>
	<div class="teamPage">
		<van-search
			v-model="searchText"
			placeholder="请输入搜索关键词"
			label="队伍"
			@search="searchTeam" />
		<team-card-list :teamList="teamList" :loading="loading"></team-card-list>
		<!-- 搜索结果为空 -->
		<van-empty
			image="search"
			description="搜索结果为空"
			v-if="teamList.length === 0" />
	</div>
</template>

<script setup lang="ts">
	import { showFailToast } from 'vant';
	import { onMounted, ref } from 'vue';
	import { listTeam } from '@/api/team';
	import TeamCardList from '@/components/TeamCardList.vue';
	import { Team } from '@/model/team';
	import { ListTeamResponse } from '@/api/types/team';

	let teamList = ref<Team[]>([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
	// 控制loading状态
	let loading = ref(true);
	// 搜索关键词
	let searchText = ref('');

	onMounted(() => {
		searchTeamList(searchText.value);
	});
	// 搜索队伍
	const searchTeam = (searchKey: string) => {
		searchTeamList(searchKey);
	};

	/**
	 * 搜索队伍page
	 */
	async function searchTeamList(searchKey: string) {
		const res: ListTeamResponse = await listTeam(searchKey);
		loading.value = false;
		if (res.code === 200) {
			teamList.value = res.data;
			searchText.value = '';
		} else {
			teamList.value = [];
			showFailToast({
				message: '搜索失败，请重试',
				className: 'particulars-detail-popup',
			});
		}
	}
</script>

<style scoped></style>
