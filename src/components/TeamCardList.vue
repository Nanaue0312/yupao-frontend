<template>
	<van-skeleton
		v-for="team in customTeamList"
		title
		avatar
		:row="3"
		:loading="props.loading"
		:key="team.id">
		<van-card
			:desc="'队伍简介：' + team.description"
			:tag="TeamStatus[team.status as keyof typeof TeamStatus]"
			:title="team.name"
			:thumb="teamBg">
			<template #num>
				{{ `队伍人数：${team.joinedCount}/${team.maxCount}` }}<br />
				{{ '过期时间：' + moment(team.expireTime).format('yyyy-MM-DD') }}
			</template>
			<!-- <template #tags>
				<van-tag
					plain
					type="primary"
					style="margin-right: 0.5rem; margin-top: 0.3rem">
					{{ TeamStatus[0] }}
				</van-tag>
			</template> -->
			<template #footer>
				<van-button
					v-if="user.id === team.createUser?.id"
					size="mini"
					type="danger"
					plain
					@click="toDeleteTeam(team.id as number)">
					解散队伍
				</van-button>
				<van-button
					v-if="user.id === team.createUser?.id"
					size="mini"
					plain
					@click="toUpdateTeam(team)">
					更新队伍信息
				</van-button>
				<van-popover v-model:show="team.showPopover">
					<template #reference>
						<van-button type="primary" size="mini" plain>操作</van-button>
					</template>
					<template #>
						<van-button
							:disabled="user.id === team.createUser?.id || team.isJoined"
							size="mini"
							type="primary"
							style="width: 100%; border: 0.5px 0px; display: flex"
							@click="toJoinTeam({ teamId: team.id, password }, team.status)">
							加入队伍
						</van-button>
						<van-button
							:disabled="user.id === team.createUser?.id || !team.isJoined"
							size="mini"
							style="width: 100%; border: 0.5px 0px; display: flex"
							@click="handleQuitTeam(team.id as number)">
							退出队伍
						</van-button>
					</template>
				</van-popover>
			</template>
		</van-card>
	</van-skeleton>
	<!-- 密码框 -->
	<van-dialog
		v-model:show="showPasswordForm"
		title="队伍密码"
		show-cancel-button
		@confirm="handleJoinAuthTeam">
		<template #>
			<!-- 可以使用 CellGroup 作为容器 -->
			<van-cell-group inset>
				<van-field
					v-model="password"
					type="password"
					label="密码："
					placeholder="请输入队伍密码" />
			</van-cell-group>
		</template>
	</van-dialog>
</template>

<script setup lang="ts">
	import type { Team } from '@/model/team';
	import { TeamStatus } from '@/constants/team';
	import teamBg from '@/assets/team-bg.svg';
	import moment from 'moment';
	import { deleteTeam, joinTeam, quitTeam } from '@/api/team';
	import { reactive, ref, watch } from 'vue';
	import { showFailToast, showSuccessToast } from 'vant';
	import { useUserStore } from '@/store/modules/user';
	import { User } from '@/model/user';
	import { router } from '@/router';
	import { useTeamStore } from '@/store/modules/team';
	// props
	const props = defineProps<{
		teamList: Team[];
		loading: boolean;
	}>();
	let customTeamList = ref<Team[]>([{}, {}, {}, {}, {}, {}, {}, {}]);
	// 等待teamList有内容后，再对teamList添加showPopover属性
	watch(
		() => props.teamList,
		(newValue) => {
			// 给各个team单独分配一个showPopover属性，单独控制操作按钮的的显示
			customTeamList.value = JSON.parse(JSON.stringify([...newValue]));

			customTeamList.value.forEach((team: Team) => {
				Object.assign(team, { showPopover: false });
			});
		}
	);

	// 获取当前登录用户
	let userStore = useUserStore();
	const user = reactive<User>(JSON.parse(userStore.user));

	// 队伍密码
	let password = ref('');
	let teamId = ref<number>(-1);
	// 控制密码输入框的状态
	let showPasswordForm = ref(false);
	// 加入队伍
	async function handleJoinTeam(joinTeamRequest: any) {
		let res: any = await joinTeam(joinTeamRequest);
		if (res.code === 200) {
			showSuccessToast({
				message: '加入成功',
				className: 'particulars-detail-popup',
			});
		} else {
			showFailToast({
				message: res.description,
				className: 'particulars-detail-popup',
			});
		}
	}
	// 加入密码队伍
	const handleJoinAuthTeam = () => {
		handleJoinTeam({ teamId, password: password.value });
	};
	// 根据队伍种类发送请求
	const toJoinTeam = async (joinTeamRequest: any, status: number) => {
		if (status === 2) {
			password.value = '';
			showPasswordForm.value = true;
			teamId = joinTeamRequest.teamId;
		} else if (status === 0) {
			// 发送加入队伍请求
			handleJoinTeam(joinTeamRequest);
		} else {
			showFailToast({
				message: '无法加入私密队伍',
				className: 'particulars-detail-popup',
			});
		}
	};

	// 存储需要更新的队伍信息
	let teamStore = useTeamStore();
	// 更新队伍信息
	const toUpdateTeam = (team: Team) => {
		router.push({
			path: '/team/update',
		});
		teamStore.team = team;
	};
	// 退出队伍
	const handleQuitTeam = async (teamId: number) => {
		let res: any = await quitTeam({ teamId });
		if (res.code === 200) {
			showSuccessToast({
				message: '退出队伍成功',
				className: 'particulars-detail-popup',
			});
		} else {
			showFailToast({
				message: '退出失败',
				className: 'particulars-detail-popup',
			});
		}
	};
	// 解散队伍
	const toDeleteTeam = async (teamId: number) => {
		let res: any = await deleteTeam(teamId);
		if (res.code === 200) {
			showSuccessToast({
				message: '解散队伍成功',
				className: 'particulars-detail-popup',
			});
		} else {
			showFailToast({
				message: '解散队伍成功失败',
				className: 'particulars-detail-popup',
			});
		}
	};
</script>

<style scoped></style>
