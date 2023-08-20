<template>
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="userAccount"
				name="用户账户"
				label="用户账户"
				placeholder="请输入用户账户"
				:rules="[{ required: true, message: '请填写用户账户' }]" />
			<van-field
				v-model="userPassword"
				type="password"
				name="密码"
				label="密码"
				placeholder="请输入密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { userLogin } from '@/api/user';
	import { LoginUserResponse } from '@/api/types/user';
	import { showFailToast } from 'vant';
	import { useRoute, useRouter } from 'vue-router';
	import moment from 'moment';
	import { SET_SESSION } from '@/utils/token';
	let route = useRoute();
	let router = useRouter();

	const userAccount = ref('');
	const userPassword = ref('');

	const onSubmit = async () => {
		let result: LoginUserResponse = await userLogin({
			userAccount: userAccount.value,
			userPassword: userPassword.value,
		});
		if (result.code == 200) {
			result.data.tags = JSON.parse(result.data.tags as string);
			result.data.createTime = moment(result.data.createTime).format(
				'YYYY-MM-DD'
			);
			router.replace({
				path: (route.query.redirect as string) || '/',
			});
			SET_SESSION(JSON.stringify(result.data));
		} else {
			showFailToast('登录失败,请检查账户和密码是否匹配');
		}
	};
</script>

<style scoped></style>
