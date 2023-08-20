<template>
	<div>
		<van-form @submit="onSubmit">
			<van-cell-group inset>
				<van-field
					v-model="createTeamData.name"
					name="name"
					label="队伍名"
					placeholder="请输入队伍名"
					:rules="[
						{
							required: true,
							message: '队伍名长度应在5-10之间',
							pattern: namePattern,
						},
					]" />
				<van-field
					v-model="createTeamData.description"
					rows="4"
					autosize
					label="简介"
					type="textarea"
					placeholder="请输入队伍的简介"
					:rules="[
						{
							message: '简介长度应在10-200之间',
							pattern: descPattern,
						},
					]" />
				<van-field
					v-model="createTeamData.expireTime"
					is-link
					readonly
					name="datePicker"
					label="过期时间"
					placeholder="点击选择过期时间"
					@click="showPicker = true" />
				<van-popover
					v-model:show="showPicker"
					placement="bottom-start"
					style="width: 80%">
					<template #default>
						<van-date-picker
							@confirm="onConfirm"
							@cancel="showPicker = false"
							:min-date="currentTime" />
					</template>
				</van-popover>
				<van-field
					name="stepper"
					label="最大人数"
					:rules="[
						{
							message: '最大人数不能超过5位',
							pattern: maxCountPattern,
						},
					]">
					<template #input>
						<van-stepper v-model="createTeamData.maxCount" min="1" max="5" />
					</template>
				</van-field>
				<van-field name="radio" label="队伍状态">
					<template #input>
						<van-radio-group
							v-model.number="createTeamData.status"
							direction="horizontal">
							<van-radio :name="0">公开</van-radio>
							<van-radio :name="1">私密</van-radio>
							<van-radio :name="2">加密</van-radio>
						</van-radio-group>
					</template>
				</van-field>
				<van-field
					v-if="createTeamData.status === 2"
					v-model="createTeamData.password"
					type="password"
					name="密码"
					label="密码"
					placeholder="请输入队伍密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
			</van-cell-group>
			<div style="margin: 16px">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { createTeam } from '@/api/team';
	import { CreateTeamResponse } from '@/api/types/team';
	import { showFailToast, showSuccessToast } from 'vant';
	import { router } from '@/router';

	const currentTime = new Date();
	currentTime.setDate(currentTime.getDate() + 1);
	let initTeamData = {
		description: '',
		expireTime: '',
		maxCount: 3,
		name: '',
		password: '',
		status: 0,
	};
	// 显示时间选择器
	const showPicker = ref(false);
	const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
		createTeamData.expireTime = selectedValues.join('-');
		showPicker.value = false;
	};
	let createTeamData = reactive({ ...initTeamData });
	// 提交表单
	const onSubmit = async (values: any) => {
		console.log(values);
		// todo 校验表单元素
		let res: CreateTeamResponse = await createTeam(createTeamData);
		if (res.code === 200) {
			showSuccessToast({
				message: '创建成功',
				className: 'particulars-detail-popup',
			});
			router.push({
				name: 'Team',
				replace: true,
			});
		} else {
			showFailToast({
				message: '创建失败，请稍后再试!',
				className: 'particulars-detail-popup',
			});
		}
	};
	// 校验规则
	const namePattern = /^[\u4e00-\u9fa5a-zA-Z0-9]{5,10}$/;
	const descPattern = /^.{10,200}$/;
	const maxCountPattern = /^\d{0,5}$/;
</script>

<style scoped></style>
