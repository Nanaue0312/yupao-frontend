<template>
	<van-cell-group inset>
		<van-cell title="个人信息" value="查看详情" is-link to="/user/info" />
		<van-cell title="创建的队伍" is-link to="/user/team/created" />
		<van-cell title="加入的队伍" is-link to="/user/team/joined" />
	</van-cell-group>
</template>

<script setup lang="ts">
	import { GET_SESSION } from '@/utils/token';
	import { onMounted, reactive } from 'vue';
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
</script>

<style scoped></style>
