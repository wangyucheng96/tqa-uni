<template>
	<!-- <view class="secret">
		<view class="notify-list">
			<view class="row" @tap="navTo(1)">
				<view class="carrier">
					<view class="notify-wrapper">
						<view class="title in3line">办公系统正式启用办公系统正式启用办公系统正式启用</view>
						<view class="time">2020-12-12</view>
						<view class="un-read" :class="'bg-'+themeColor.name"></view>
					</view>
				</view>
			</view>
		</view>
	</view> -->
	<view class="card-container" style="min-height: 100vh;">
		<view class="content">
			<view class="event-item" v-for="item in list" :key="item.index">
				<view>
					<span class="left-text" style="width: 100%">
						<p>
							<span class="item-label">标题：</span>
							<span class="item-value">{{ item.title }}</span>
						</p>
						<p>
							<span class="item-label">发布时间：</span>
							<span class="item-value">{{ item.publishTime }}</span>
						</p>
					</span>
				</view>
			</view>
			<!-- <view class="event-item" v-for="item in certification" :key="item.index">
				<view>
					<span class="left-text" style="width: 80%">
						<p>
							<span class="item-label">证书名称：</span>
							<span class="item-value">{{ item.certiName }}</span>
						</p>
						<p>
							<span class="item-label">下次复审日期：</span>
							<span class="item-value">{{ item.nextRecheckDate }}</span>
						</p>
					</span>
					<span class="right-text"> 查看 </span>
				</view>
			</view> -->
			<!-- <view class="event-item" v-for="item in device" :key="item.index">
				<view>
					<span class="left-text" style="width: 80%">
						<p>
							<span class="item-label">设备名称：</span>
							<span class="item-value">{{ item.deviceName }}</span>
						</p>
						<p>
							<span class="item-label">下次检查日期：</span>
							<span class="item-value">{{ item.nextCheckDate }}</span>
						</p>
					</span>
				</view>
			</view> -->
			<!-- <view class="event-item" v-for="item in training" :key="item.index">
				<view>
					<span class="left-text" style="width: 80%">
						<p>
							<span class="item-label">培训计划名称：</span>
							<span class="item-value">{{ item.planName }}</span>
						</p>
						<p>
							<span class="item-label">培训日期：</span>
							<span class="item-value">{{ item.trainingDate }}</span>
						</p>
					</span>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		getReminders
	} from "@/api/process";
	import {
		fetchList
	} from "@/api/common";
	import {
		pmTables
	} from "@/api/gen/pm";
	import {
		request
	} from '@/utils/request/request2';
	import config from '@/config/index.config';
	export default {
		data() {
			return {
				list: [],
				certification: [],
				device: [],
				training: [],
				total: 100,
				loading: false,
				finished: false,
				refreshing: false,
				current: 1,
				size: 10,
			};
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.pageStore.$state.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
			let userinfo = uni.getStorageSync('userinfo');
			this.getNewsList(true);
		},
		onReachBottom(e) { // 触底-上拉加载更多
			this.getNewsList(false)
		},
		async onPullDownRefresh() { // 下拉刷新
			await this.onRefresh()
		},
		methods: {
			onRefresh() {
				this.getNewsList(true);
			},
			getNewsList(isRefresh) {
				if (isRefresh) {
					this.current = 1;
					this.list = [];
					this.refreshing = true;
				} else {
					this.loading = true;
				}
				let param = {
					current: this.current,
					size: this.size,
					isPublished: "yes"
				};

				fetchList(pmTables.pmBasicAnnouncement, param).then((res) => {
						let list = [];
						list = list.concat(res.data.data.records);
						this.list = list;
					})
					.finally(() => {
						uni.stopPullDownRefresh();
						this.refreshing = false;
					});
			},
			getList(isRefresh) {
				if (isRefresh) {
					this.current = 1;
					this.list = [];
					this.refreshing = true;
				} else {
					this.loading = true;
				}
				request({
						url: config.baseUrl + getReminders,
						method: 'get',
					}).then((res) => {
						let list = [];
						list = list
							.concat(res.data.data.certification)
							.concat(res.data.data.device)
							.concat(res.data.data.training);
						this.list = list;
						this.certification = res.data.data.certification;
						this.device = res.data.data.device;
						this.training = res.data.data.training;
					})
					.finally(() => {
						uni.stopPullDownRefresh();
						this.refreshing = false;
					});
			},

			// 通用跳转
			async navTo(item) {
				this.$mRouter.push({
					route: `/pages/notice/detail?id=${item}`
				});
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.secret {
		.add-round {
			position: fixed;
			z-index: 999;
			right: 30rpx;
			bottom: 30rpx;
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			color: #fff;
			text-align: center;
			line-height: 120rpx;
			font-weight: 100;
			font-size: 80rpx;
		}

		.notify-list {
			margin-top: 20upx;

			.read {
				text-align: right;
				margin-right: $spacing-base;
				margin-top: $spacing-base;
				margin-bottom: $spacing-sm;

				text {
					margin-left: $spacing-base;
				}
			}

			.row {
				width: calc(94%);
				height: calc(22vw + 40upx);
				margin: 0 auto $spacing-base;
				border-radius: 15upx;
				box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;
				position: relative;
				overflow: hidden;
				z-index: 4;
				border: 0;

				.menu {
					.iconfont {
						color: #fff;
						font-size: 60upx;
					}

					position: absolute;
					width: 29%;
					height: 100%;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					z-index: 2;
				}

				.carrier {
					@keyframes showMenu {
						0% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-30%);
						}
					}

					@keyframes closeMenu {
						0% {
							transform: translateX(-30%);
						}

						100% {
							transform: translateX(0);
						}
					}

					&.open {
						animation: showMenu 0.25s linear both;
					}

					&.close {
						animation: closeMenu 0.15s linear both;
					}

					background-color: #fff;
					position: absolute;
					width: 100%;
					padding: 0 0;
					height: 100%;
					z-index: 3;
					display: flex;
					align-items: center;
				}
			}

			.notify-wrapper {
				background-color: $color-white;
				width: 100%;
				padding: $spacing-base $spacing-lg $spacing-base $spacing-lg;
				margin: $spacing-base 0 0;
				border-radius: 15upx;
				position: relative;

				.title {
					font-size: $font-lg;
					color: $font-color-dark;
					font-weight: 500;
					margin: 0 0 $spacing-sm;
				}

				.content {
					font-size: $font-sm;
					color: $font-color-base;
					height: 75upx;
					line-height: 36upx;
				}

				.time {
					font-size: $font-base;
					color: $font-color-light;
				}

				.type {
					position: absolute;
					top: 26upx;
					left: -10upx;
					border: none;
					font-size: $font-sm;
					opacity: 0.8;
				}

				.un-read {
					display: inline-block;
					width: 12upx;
					height: 12upx;
					border-radius: 50%;
					position: absolute;
					top: 32upx;
					right: 30upx;
				}
			}
		}

		.notify-empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			.iconfont {
				font-size: $font-lg + 100upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm + 2upx;
				color: $font-color-disabled;

				.navigator {
					margin-left: 16upx;
				}
			}
		}
	}
</style>