<template>
	<van-skeleton
		title
		avatar
		:row="3"
		:loading="loading"
		v-for="user in userList">
		<van-card
			:desc="user.profile"
			:title="user.username"
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
</template>

<script setup lang="ts">
	import { User } from '@/model/user';

	let { userList, loading } = defineProps<{
		userList: User[];
		loading: boolean;
	}>();
</script>

<style scoped></style>
