<template>
	<van-form @submit="onSubmit">
		<van-cell-group>
			<van-field
				v-model="editUser.editValue"
				:name="editUser.editKey"
				:label="editUser.editLabel"
				:placeholder="`请输入${editUser.editLabel}`" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<script setup lang="ts">
	import { LoginUserResponse } from '@/api/types/user';
	import { getCurrentUser, updateUser } from '@/api/user';
	import { router } from '@/router';
	import { SET_SESSION } from '@/utils/token';
	import moment from 'moment';
	import { showFailToast, showNotify } from 'vant';
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	let $route = useRoute();

	const editUser = ref({
		editKey: $route.query.editKey as string,
		editValue: $route.query.editValue as string,
		editLabel: $route.query.editLabel as string,
		userId: parseInt($route.query.id as string),
	});

	const onSubmit = async () => {
		// TODO 把editUser中的属性提交给后端
		let res: any = await updateUser(
			editUser.value.userId,
			editUser.value.editKey,
			editUser.value.editValue
		);
		if (res.code === 200) {
			router.push({
				path: '/user/info',
				replace: true,
			});
			showNotify({ type: 'success', message: '修改用户成功', duration: 800 });
			let result: LoginUserResponse = await getCurrentUser();
			console.log(result.data);
			if (result.code === 200) {
				// 如果一登陆则放行
				result.data.tags = JSON.parse(result.data.tags as string);
				result.data.createTime = moment(result.data.createTime).format(
					'YYYY-MM-DD'
				);
				// 更新登录信息
				SET_SESSION(JSON.stringify(result.data));
			} else {
				showFailToast('获取用户信息失败,请重试!');
			}
		} else {
			showNotify({
				type: 'danger',
				message: '修改用户失败,请重试',
				duration: 800,
			});
		}
	};
</script>

<style scoped></style>
