<template>
	<div>
		<team-card-list :teamList="teamList" :loading="loading"></team-card-list>
		<!-- 搜索结果为空 -->
		<van-empty
			image="search"
			description="搜索结果为空"
			v-if="!teamList || teamList.length === 0" />

		<van-floating-bubble
			v-model:offset="offset"
			icon="plus"
			@click="handleCreateTeam" />
	</div>
</template>

<script setup lang="ts">
	import { showFailToast } from 'vant';
	import { onMounted, ref } from 'vue';
	import { listCreatedTeam } from '@/api/team';
	import TeamCardList from '@/components/TeamCardList.vue';
	import { Team } from '@/model/team';
	import { useRouter } from 'vue-router';

	let teamList = ref<Team[]>([]);
	// 浮动气泡的位置
	// 浮动气泡的位置
	const offset = ref({ x: 290, y: 550 });

	let router = useRouter();
	// 控制loading状态
	let loading = ref(true);
	// 搜索关键词
	let searchText = ref('');

	onMounted(() => {
		searchCreatedTeamList();
	});
	/**
	 * 跳转到
	 */
	const handleCreateTeam = () => {
		router.push('/team/join');
	};
	/**
	 * 搜索用户创建的队伍列表
	 */
	async function searchCreatedTeamList() {
		loading.value = true;
		const res = await listCreatedTeam();
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
