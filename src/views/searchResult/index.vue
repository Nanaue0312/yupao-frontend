<template>
	<user-card-list :userList="userList" :loading="loading"></user-card-list>
	<!-- 搜索结果空提示 -->
	<van-empty
		v-if="!userList || !userList.length"
		image="search"
		description="搜索结果为空" />
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { showNotify } from 'vant';
	import { searchUserByTags } from '@/api/user';
	import UserCardList from '@/components/UserCardList.vue';
	import { User } from '@/model/user';

	// 获取选择的标签数组
	const { selectedTags } = defineProps(['selectedTags']);
	let userList = ref<User[]>([{}, {}, {}, {}, {}, {}, {}]);
	let loading = ref(true);
	onMounted(async () => {
		const userListData = await searchUserByTags(selectedTags)
			.then((response) => {
				console.log('/user/search/tags', response);
				// @ts-ignore
				if (response.code === 200) {
					showNotify({
						type: 'success',
						message: '搜索用户成功',
						duration: 800,
					});
					return response.data;
				}
				showNotify({
					type: 'danger',
					message: '搜索用户失败，请重试！',
					duration: 800,
				});
			})
			.catch((error) => {
				console.log('/user/search/tags', error);
				showNotify({
					type: 'danger',
					message: '搜索用户失败，请重试！',
					duration: 800,
				});
			});
		if (userListData) {
			// 解析后端传来的user.tags属性
			userListData.forEach((user) => {
				if (user.tags) {
					user.tags = JSON.parse(user.tags);
				}
			});
			userList.value = userListData;
		}
		loading.value = false;
	});
</script>

<style scoped></style>
