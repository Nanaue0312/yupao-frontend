<template>
	<van-skeleton
		title
		avatar
		:row="3"
		:loading="loading"
		v-for="user in matchUserList"
		:key="user.id">
		<van-card
			:desc="user.profile"
			:title="user.username"
			tag="相似用户"
			:thumb="
				user.avatarUrl || 'https://image.nanaue-code.top/202308021508146.jpg'
			">
			<template #tags>
				<van-tag
					plain
					type="primary"
					v-for="(tag, index) in user.tags"
					:key="index"
					style="margin-right: 0.5rem; margin-top: 0.3rem">
					{{ tag }}
				</van-tag>
			</template>
			<template #footer>
				<van-button size="mini" plain type="primary">联系我</van-button>
			</template>
		</van-card>
	</van-skeleton>

	<user-card-list :user-list="userList" :loading="loading"></user-card-list>
</template>

<script setup lang="ts">
	import UserCardList from '@/components/UserCardList.vue';
	import type {
		RecommendUserResponse,
		SearchUserResponse,
	} from '@/api/types/user';
	import { getMatchUserList, getRecommendUserList } from '@/api/user';
	import { showFailToast } from 'vant';
	import { onMounted } from 'vue';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { User } from '@/model/user';

	// 控制loading状态
	let loading = ref(true);
	let pageNum = ref(1);
	let pageSize = ref(20);
	let router = useRouter();
	let userList = ref<User[]>([{}, {}, {}, {}, {}, {}, {}, {}]);

	onMounted(async () => {
		loading.value = true;
		await getMatchUser();
		await searchRecommendUserList();
		loading.value = false;
	});
	/**
	 * 获取匹配值最高的用户
	 */
	let matchUserList = ref<User[]>([]);
	const MAX_MATCH_USER_COUNT = 5;
	const getMatchUser = async () => {
		let res: SearchUserResponse = await getMatchUserList(MAX_MATCH_USER_COUNT);
		if (res.code === 200) {
			res.data.map((user) => {
				user.tags = JSON.parse(user.tags as string);
			});
			matchUserList.value = res.data;
		} else {
			showFailToast({
				message: '获取推荐用户失败,请重试!',
				className: 'particulars-detail-popup',
			});
		}
	};
	/**
	 * 获取推荐用户
	 */
	async function searchRecommendUserList() {
		try {
			let result: RecommendUserResponse = await getRecommendUserList(
				pageNum.value,
				pageSize.value
			);
			if (result.code === 200) {
				result.data.records.map((user) => {
					user.tags = JSON.parse(user.tags as string);
				});
				userList.value = result.data.records;
			} else if (result.code === 40100) {
				showFailToast({
					message: '请登录后再试!',
					className: 'particulars-detail-popup',
				});
				router.push({
					name: 'UserLogin',
				});
			} else {
				showFailToast({
					message: '获取用户失败,请重试!',
					className: 'particulars-detail-popup',
				});
			}
		} catch (error) {
			showFailToast({
				message: '获取用户失败,请重试!',
				className: 'particulars-detail-popup',
			});
		}
	}
</script>

<style scoped></style>
