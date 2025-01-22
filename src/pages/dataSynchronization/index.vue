<template>
	<view class="container">
		<view class="historyImport-wrapper">
			<view class="historyImport">
				历史同步信息
			</view>
		</view>
		<view class="equipment-wrapper">
			<view class="equipment">
				设备已连接
			</view>
		</view>
		<view class="import-btn-wrapper">
			<button class="import-btn" type="primary" @click="handleImport">
				立即同步
			</button>
		</view>
		<view class="info-text">
			<view class="updateText">数据更新时间为：
				<span class="updateTime">{{ updateTime }}</span>
			</view>
		</view>
		<view class="progressBar" v-if="showImportText">
			<view class="isUpdate">正在同步</view>
			<piaoyiProgressBar :progress="progress" backgroundColor="#EFEFF4" progressBackgroundColor="#07C160"
				:showText="true" textColor="#fff" :textSize="24" :height="50"></piaoyiProgressBar>
		</view>
	</view>
</template>

<script>
import DB from "@/utils/sqlite/sqlite.js";
import piaoyiProgressBar from '@/uni_modules/piaoyi-progress-bar/components/piaoyi-progress-bar/piaoyi-progress-bar.vue';

export default {
	components: {
		piaoyiProgressBar
	},
	data() {
		return {
			updateTime: '2024.12.12 12:12:12', // 初始化数据更新时间
			showImportText: false,
			progress: 0, // 进度条初始值
			progressInterval: null // 定时器
		};
	},
	methods: {
		handleImport() {
			this.showImportText = true;
			this.progress = 0; // 重置进度条
			uni.showToast({
				title: '同步中...',
				icon: 'none',
				duration: 3000 // 显示3秒
			});

			// 使用 setInterval 模拟进度条的动态效果
			this.progressInterval = setInterval(() => {
				if (this.progress < 100) {
					this.progress += 10; // 每次增加10%
				} else {
					clearInterval(this.progressInterval); // 清除定时器
					this.updateTime = new Date().toLocaleString(); // 更新为新的时间或状态
					this.showImportText = false;
					uni.showToast({
						title: '同步完成',
						icon: 'success'
					});
				}
			}, 300); // 每300毫秒更新一次
		}
	},
	beforeDestroy() {
		if (this.progressInterval) {
			clearInterval(this.progressInterval); // 组件销毁时清除定时器
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 20px;
}

.info-text {
	font-size: 14px;
	color: #333;
	line-height: 20px;
	margin: 15px 0;
	text-align: center;

	.updateText {
		display: block;
		margin-bottom: 10px;
		color: #2aa2a8;
		font-weight: bold;
	}

	.updateTime {
		color: #333;
	}
}

.historyImport-wrapper {
	display: flex;
	justify-content: flex-end;

	.historyImport {
		width: 150px;
		font-size: 16px;
		font-weight: bold;
		margin: 20px 10px;
		color: rgb(90, 77, 141);
		cursor: pointer;
	}
}

.import-btn-wrapper {
	.import-btn {
		width: 50%;
		height: 100px;
		line-height: 100px;
		font-size: 23px;
	}
}

.equipment-wrapper {
	margin: 50px 0 20px 0;

	.equipment {
		margin: 0 auto;
		width: 25%;
		color: #0693c6;
		font-weight: bold;
	}
}

.progressBar {
	margin-top: 80px;

	.isUpdate {
		width: 30%;
		margin: 20px auto;
		font-size: 16px;
		font-weight: bold;
		color: rgb(127, 133, 156);
	}
}
</style>