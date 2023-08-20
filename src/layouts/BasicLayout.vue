<template>
	<div>
		<!-- 顶部导航栏 -->
		<van-nav-bar
			:title="title"
			left-text="返回"
			left-arrow
			@click-left="goBack"
			@click-right="toSearch">
			<template #right>
				<van-icon name="search" size="18" />
			</template>
		</van-nav-bar>
		<!-- <template v-if="active === 'home'"><Home></Home> </template>
		<template v-if="active === 'team'"><Team></Team> </template>
		<template v-if="active === 'user'"><User></User> </template> -->
		<div id="content">
			<router-view>
				<template #="{ Component }">
					<component :is="Component"></component>
				</template>
			</router-view>
		</div>
		<!-- 底部导航栏 -->
		<van-tabbar route>
			<van-tabbar-item name="home" to="/" icon="home-o"> 主页 </van-tabbar-item>
			<van-tabbar-item name="team" to="/team" icon="friends-o">
				队伍
			</van-tabbar-item>
			<van-tabbar-item name="user" to="/user" icon="user-o">
				我的
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	let router = useRouter();
	let route = useRoute();
	let title = ref<string>(route.meta.title as string);
	watch(
		() => route.path,
		() => {
			title.value = route.meta.title as string;
		}
	);
	const goBack = () => {
		router.go(-1);
	};
	const toSearch = () => {
		router.push({
			name: 'Search',
		});
	};
</script>

<style scoped>
	#content {
		padding-bottom: 50px;
	}
</style>
