<template>
	<view style="padding: 20rpx;">
		<view class="tree-item" v-for="(item, index) in treeData" :key="index">
			<view class="item-content" @click="toggleItem(item)" :class="{ 'is-leaf': !item.children }">
				<view class="item-icon" v-if="item.children">
					<image class="arrow" :src="getArrowSrc(item.expanded)"></image>
					<image class="icon" :class="{ [`level-${index}`]: true }"
						:src="getIconSrc(item.level, item.completed)"></image>
				</view>
				<view class="item-icon" v-else>
					<image class="icon" :class="{ [`level-${index}`]: true }"
						:src="getIconSrc(item.level, item.completed)"></image>
				</view>
				<text class="item-label">{{ item.content_name }}</text>
				<view v-if="item.children" class="status-label">
					<view v-if="checkChildrenStatus(item.children).completed">
						<text class="completed-label">已完成</text>
					</view>
					<view v-else>
						<text class="incomplete-count">{{ checkChildrenStatus(item.children).incompleteCount }}</text>
					</view>
				</view>
			</view>
			<view v-if="item.children" class="sub-items" :class="{ 'expanded': item.expanded }">
				<tree-item :treeData="item.children" @select="onSelect"></tree-item>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'TreeItem',
	props: ['treeData'],
	data() {
		return {
			// 其他数据
		};
	},
	methods: {
		
		toggleItem(item) {
			if(item.level === 1){
				this.$emit('select', item);
			}
			/*
			if (item.children) {
				this.$set(item, 'expanded', !item.expanded);
				
			} else {
				this.$emit('select', item);
			}*/
		},
		onSelect(item) {
			this.$emit('select', item);
		},
		getIconSrc(level, completed) {
			if (level == 2 && !completed) {
				return `/static/icons/icon-level-incomplete.png`;

			}
			return `/static/icons/icon-level-${level}.png`;
		},
		getArrowSrc(expanded) {
			return expanded ? '/static/icons/arrow-down.png' : '/static/icons/arrow-right.png';
		},
		checkChildrenStatus(children) {
			if (!children || children.length === 0) {
				return { completed: true, incompleteCount: 0 };
			}

			let completed = true;
			let incompleteCount = 0;

			for (const child of children) {
				if (child.children) {
					const childStatus = this.checkChildrenStatus(child.children);
					if (!childStatus.completed) {
						completed = false;
						incompleteCount += childStatus.incompleteCount;
					}
				} else {
					if (!child.completed) {
						completed = false;
						incompleteCount += 1;
					}
				}
			}

			return { completed, incompleteCount };
		}
	}
};
</script>

<style lang="scss" scoped>
.tree-item {
	margin-bottom: 16rpx;
}

.item-content {
	display: flex;
	align-items: center;
	padding: 24rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	transition: all 0.3s ease;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
	width: 95%;

	&:active {
		background-color: #f0f0f0;
		transform: scale(0.98);
	}

	&.is-leaf:active {
		background-color: #e6f7ff;

		.item-label {
			color: #1890ff;
		}
	}
}

.item-icon {
	margin-right: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80rpx;
	height: 40rpx;
}

.arrow {
	width: 16rpx;
	height: 16rpx;
	margin-right: 10rpx;
}

.icon {
	width: 32rpx;
	height: 32rpx;
}

.leaf-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #1890ff;
}

.item-label {
	font-size: 28rpx;
	color: #333333;
	transition: color 0.3s ease;
}

.sub-items {
	margin-left: 50rpx;
	margin-top: 20rpx;
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease;

	&.expanded {
		max-height: 2000rpx; // 根据需要调整这个值
	}
}

.status-label {
	margin-left: 10rpx;
	display: flex;
	align-items: center;
}

.completed-label {
	color: #ffffff; // 白色文字
	background-color: #1890ff; // 蓝色背景
	padding: 4rpx 8rpx;
	border-radius: 6rpx;
	font-size: 24rpx;
}

.incomplete-count {
	color: #ffffff; // 白色文字
	background-color: #ff0000; // 红色背景
	padding: 4rpx 11rpx;
	border-radius: 50%; // 圆形背景
	font-size: 24rpx;
	margin-right: 5rpx;
}
</style>