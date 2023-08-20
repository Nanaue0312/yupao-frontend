<template>
	<div>
		<team-card-list :teamList="teamList" :loading="loading"></team-card-list>
		<!-- 搜索结果为空 -->
		<van-empty
			image="search"
			description="搜索结果为空"
			v-if="!teamList || teamList.length === 0" />
	</div>
</template>

<script setup lang="ts">
	import { showFailToast } from 'vant';
	import { onMounted, ref } from 'vue';
	import { listJoinedTeam } from '@/api/team';
	import TeamCardList from '@/components/TeamCardList.vue';
	import { Team } from '@/model/team';

	let teamList = ref<Team[]>([]);
	// 控制loading状态
	let loading = ref(true);
	// 搜索关键词
	let searchText = ref('');

	onMounted(() => {
		searchJoinedTeamList();
	});

	/**
	 * 搜索用户加入的队伍列表
	 */
	async function searchJoinedTeamList() {
		loading.value = true;
		const res = await listJoinedTeam();
		loading.value = false;
		if (res.code === 200) {
			teamList.value = res.data;
			searchText.value = '';
		} else {
			showFailToast({
				message: '搜索失败，请重试',
				className: 'particulars-detail-popup',
			});
		}
	}
</script>

<style scoped></style>
