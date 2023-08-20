<template>
	<div>
		<!-- 搜索组件 -->
		<form action="/">
			<van-search
				v-model="searchKey"
				show-action
				placeholder="请输入要筛选的标签名称"
				@search="onSearch"
				@cancel="onCancel" />
		</form>
		<van-divider>已选标签</van-divider>
		<van-row gutter="20">
			<van-col v-for="(tag, index) in selectedTags" :key="index">
				<van-tag
					:show="true"
					plain
					type="primary"
					@close="close(index)"
					closeable>
					{{ tag }}
				</van-tag>
			</van-col>
		</van-row>
		<van-divider>可选标签</van-divider>
		<van-tree-select
			v-model:active-id="selectedTags"
			v-model:main-active-index="activeIndex"
			:items="tagList" />
		<van-button
			style="width: 5rem; position: absolute; right: 0.5rem; margin-top: 1rem"
			plain
			type="primary"
			size="small"
			@click="handleSearchUser">
			搜索
		</van-button>
	</div>
</template>

<script setup lang="ts">
	import { showToast } from 'vant';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	const router = useRouter();
	const initialTagList = [
		{
			text: '浙江',
			children: [
				{ text: '杭州', id: '杭州' },
				{ text: '温州', id: '温州1' },
				{ text: '温州', id: '温州2' },
				{ text: '温州', id: '温州3' },
				{ text: '温州', id: '温州4' },
				{ text: '温州', id: '温州5' },
				{ text: '温州', id: '温州6' },
				{ text: '温州', id: '温州7' },
				{ text: '温州', id: '温州8' },
				{ text: '温州', id: '温州9' },
				{ text: '温州', id: '温州0' },
				{ text: '温州', id: '温州11' },
				{ text: '温州', id: '温州12' },
				{ text: '宁波', id: '宁波', disabled: true },
			],
		},
		{
			text: '江苏',
			children: [
				{ text: '南京', id: '南京' },
				{ text: '无锡', id: '无锡' },
				{ text: '徐州', id: '徐州' },
			],
		},
		{ text: '福建', disabled: true },
	];
	// 深拷贝initialTagList
	let tagList = ref(JSON.parse(JSON.stringify(initialTagList)));
	const searchKey = ref('');
	/**
	 * 过滤标签对象数组
	 * @param key 搜索的关键词
	 */
	const onSearch = (key: any) => {
		tagList.value = JSON.parse(JSON.stringify(initialTagList));
		tagList.value = tagList.value.map((parentTag: any) => {
			parentTag.children = parentTag.children?.filter((tag: any) =>
				tag.id.includes(key)
			);
			return parentTag;
		});
	};
	const onCancel = () => {
		searchKey.value = '';
		tagList.value = JSON.parse(JSON.stringify(initialTagList));
	};
	// 关闭tag标签
	const close = (index: number) => {
		selectedTags.value.splice(index, 1);
	};
	// 已选择的标签
	const selectedTags = ref<number[]>([]);
	// 选中的标签组索引
	const activeIndex = ref(0);
	// 跳转页面到搜索结果页
	const handleSearchUser = () => {
		if (!selectedTags.value.length) {
			showToast({
				message: '请选择搜索用户拥有的标签',
				position: 'top',
				type: 'fail',
			});
			return;
		}
		router.push({
			name: 'SearchUser',
			query: {
				// 传递已选择的标签参数
				selectedTags: selectedTags.value,
			},
		});
	};
</script>

<style scoped></style>
