<template>
	<van-cell-group :inset="true" border>
		<van-cell
			title="用户名"
			:value="user.username"
			is-link
			@click="toEditUser('username', '用户名', user.username)" />
		<van-cell
			title="头像"
			is-link
			@click="toEditUser('avatarUrl', '头像', user.avatarUrl)">
			<template #value>
				<van-image width="3rem" height="3rem" :src="user.avatarUrl" />
			</template>
		</van-cell>
		<van-cell
			title="用户账户"
			:value="user.userAccount"
			is-link
			@click="toEditUser('account', '用户账户', user.userAccount)" />
		<van-cell
			title="性别"
			:value="user.gender"
			is-link
			@click="toEditUser('gender', '性别', user.gender)" />
		<van-cell
			title="电话"
			:value="user.tele"
			is-link
			@click="toEditUser('tele', '电话', user.tele)" />
		<van-cell
			title="邮箱"
			:value="user.email"
			is-link
			@click="toEditUser('email', '邮箱', user.email)" />
		<van-cell
			title="用户标签"
			is-link
			@click="toEditUser('tags', '用户标签', user.tags)">
			<template #value>
				<van-row gutter="5" justify="end">
					<van-col v-for="(tag, index) in user.tags" :key="index">
						<van-tag :show="true" plain type="primary">
							{{ tag }}
						</van-tag>
					</van-col>
				</van-row>
			</template>
		</van-cell>
		<van-cell title="创建时间" :value="user.createTime" is-link />
	</van-cell-group>
</template>

<script setup lang="ts">
	import { GET_SESSION } from '@/utils/token';
	import { onMounted, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	let user = reactive({
		avatarUrl: '',
		createTime: '',
		email: '',
		gender: '',
		id: '',
		isDelete: '',
		planetCode: '',
		status: '',
		tags: '',
		tele: '',
		updateTime: '',
		userAccount: '',
		userPassword: '',
		userRole: '',
		username: '',
	});
	onMounted(() => {
		Object.assign(user, JSON.parse(GET_SESSION() as string));
	});
	const router = useRouter();
	const toEditUser = (
		userKey: string,
		label: string,
		val: string | number | string[] | undefined
	) => {
		router.push({
			path: '/user/edit',
			query: {
				id: user.id,
				editKey: userKey,
				editValue: val,
				editLabel: label,
			},
		});
	};
</script>

<style scoped></style>
