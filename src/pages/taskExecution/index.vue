<template>
	<view class="container">
		<tree-item :treeData="treeData" @select="onSelect"></tree-item>
	</view>
</template>

<script>
import TreeItem from './TreeItem.vue'

export default {
	name: 'TreeSelector',
	components: {
		TreeItem
	},
	data() {
		return {
			treeData: [{
				label: 'DL000063 钢板@16x310x920',
				level: 0,
				expanded: false,
				completed: true, // 添加 completed 字段
				children: [{
					label: '10 划线',
					level: 1,
					completed: true, // 添加 completed 字段
					children: [{
						label: 'Q1000000043 长度',
						level: 2,
						completed: true // 添加 completed 字段
					}]
				},
				{
					label: '20车63',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: 'Q1000000043 长度',
						level: 2,
						completed: true // 添加 completed 字段
					},
					{
						label: 'Q1000000045 厚度',
						level: 2,
						completed: true, // 添加 completed 字段
					},
					{
						label: 'Q1000000044 宽度',
						level: 2,
						completed: true, // 添加 completed 字段
					}]
				}]
			},
			{
				label: '00004131电机',
				level: 0,
				expanded: false,
				completed: false, // 添加 completed 字段
				children: [{
					label: 'DL000017 门座架装置',
					level: 1,
					completed: false, // 添加 completed 字段
					children: [{
						label: '0000980-20 焊接',
						level: 2,
						completed: true // 添加 completed 字段
					}]
				},
				{
					label: 'DL30001885 车轮',
					level: 1,
					completed: false, // 添加 completed 字段
					children: [{
						label: '0000876-10正火',
						level: 2,
						completed: true // 添加 completed 字段
					}]
				},
				{
					label: 'Z2022-101 合结钢',
					level: 1,
					completed: false, // 添加 completed 字段
					children: [{
						label: '0000980-20 焊接',
						level: 2,
						completed: true // 添加 completed 字段
					}]
				},
				{
					label: 'Q1000000071 线匝数检查',
					level: 1,
					expanded: false,
					completed: false, // 添加 completed 字段
					children: [{
						level: 2,
						label: '0000413-10 定子检验',
						completed: false // 添加 completed 字段
					},
					{
						level: 2,
						label: '0000413-20 转子检验',
						completed: true // 添加 completed 字段
					},
					{
						level: 2,
						label: '0000413-30 辅助件检验',
						completed: true // 添加 completed 字段
					},
					{
						level: 2,
						label: '0000413-40 端盖检验',
						completed: true // 添加 completed 字段
					}]
				},
				{
					label: 'Z2022-2012 弹条/W型',
					level: 1,
					expanded: false,
					completed: false, // 添加 completed 字段
					children: [{
						level: 2,
						label: '0003827-10 淬火硬度',
						completed: false // 添加 completed 字段
					},
					{
						level: 2,
						label: '0003827-20 内层厚度',
						completed: false // 添加 completed 字段
					},
					{
						level: 2,
						label: '0003827-30 涂层硬度',
						completed: false // 添加 completed 字段
					},
					{
						level: 2,
						label: '0003827-30 表层厚度',
						completed: false // 添加 completed 字段
					}]
				},
				{
					label: 'EQSB001 离心泵',
					level: 1,
					completed: false, // 添加 completed 字段
					children: [{
						label: '0003854-0005 test',
						level: 2,
						completed: false // 添加 completed 字段
					}]
				}]
			}]
		}
	},
	methods: {
		onSelect(item) {
			console.log('Selected:', item)
			this.navTo("/pages/taskExecution/detail");
			// uni.showToast({
			// 	title: `已选择: ${item.label}`,
			// 	icon: 'none'
			// })
		},
		navTo(route) {
			this.$mRouter.push({
				route
			});
		}
	}
}
</script>


<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f0f2f5;
}

.header {
	padding: 30rpx 40rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);

	.title {
		color: #ffffff;
		font-size: 36rpx;
		font-weight: 600;
		letter-spacing: 1rpx;
	}
}

.tree-container {
	flex: 1;
	padding: 30rpx;
	width: 80%;
}
</style>