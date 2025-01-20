	<template>
		<view class="visit">
			<view class="promotion-center1">
				<image :src="advList[0].cover" mode="aspectFill" style="width: 100vw;height: 150px;"></image>
			</view>
			<view class="title-bar">
				<view class="title"><span>全部提醒</span></view>
			</view>
			<view class="moudle-group">
				<view class="moudle-item" v-for="(item, index) in moudleList" :key="index" @tap="toEnterPage(item)">
					<view class="badge" v-if="item.badge">
						{{ item.badge }}
					</view>
					<view class="icon" style="line-height:1">
						<text class="t-icon" style="font-size:60upx" :class="[item.icon]"></text>
						<!-- <iconfont-svg :icon="item.icon" size="30"></iconfont-svg> -->
					</view>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>

		</view>

	</template>

	<script>
		// import {
		// 	worksList
		// } from '@/api/userInfo';
		import rfLoadMore from '@/components/oa-load-more/oa-load-more';
		import dayjs from 'dayjs ';
		import $mAssetsPath from '@/config/assets.config';
		import oaEmpty from '@/components/oa-empty';

		//app
		import {
			getAuditToDo
		} from "@/api/process";
		import {
			getAlert
		} from '@/api/alert';
		import {
			request
		} from '@/utils/request/request2';
		import config from '@/config/index.config';
		export default {
			components: {
				rfLoadMore,
				oaEmpty
			},
			data() {
				return {
					worksList: [],
					page: 1,
					// cate_id: '',
					loadingType: 'more',
					loading: true,
					hasLogin: false,
					moneySymbol: this.moneySymbol,
					// 控制滑动效果
					theIndex: null,
					oldIndex: null,
					advList: [{
						"id": "1",
						"adv_title": "",
						"cover": "/static/img/carousel1.png"
					}], // 广告图
					moudleList: [
						// {
						// 	icon: "iconmimazhongzhi",
						// 	iconColor: "#CD5C5C",
						// 	title: "工作票审批",
						// 	toRouteName: "/pages/special_work/workApproval/index",
						// 	badge: 0
						// },
						{
							icon: "sic-renyuanpeixun",
							iconColor: "#FFD700",
							title: "人员培训",
							toRouteName: "/pages/todoTask/trainingAlert/index",
							badge: 0
						},
						{
							icon: "sic-neibuyuangongzhengshu",
							iconColor: "#6A5ACD",
							title: "员工证书",
							toRouteName: "/pages/todoTask/certificationAlert/index",
							badge: 0
						},
						{
							icon: "sic-gongsizhengshu",
							iconColor: "#CD5C5C",
							title: "公司证书",
							toRouteName: "/pages/todoTask/companyCertAlert/index",
							badge: 0
						},
						{
							icon: "sic-yingjiwuzi",
							iconColor: "#8470FF",
							title: "应急物资",
							toRouteName: "/pages/todoTask/materialAlert/index",
							badge: 0
						},
						{
							icon: "sic-shebeitixing",
							iconColor: "#DAA520",
							title: "设备检定",
							toRouteName: "/pages/todoTask/deviceAlert/index",
							badge: 0
						},
						{
							icon: "sic-yinhuanzhenggai",
							iconColor: "#8B008B",
							title: "隐患整改",
							toRouteName: "/pages/todoTask/hiddenHazardAlert/index",
							badge: 0
						},
						{
							icon: "sic-yingjiyanlian",
							iconColor: "#8B008B",
							title: "应急演练",
							toRouteName: "/pages/todoTask/emergencyPractice/index",
							badge: 0
						},
						{
							icon: "sic-shebeibaoyang",
							iconColor: "#8B008B",
							title: "设备保养",
							toRouteName: "/pages/todoTask/deviceMtnRecordAlert/index",
							badge: 0
						},
						{
							icon: "sic-shebeidianjian",
							iconColor: "#8B008B",
							title: "设备点检",
							toRouteName: "/pages/todoTask/deviceTestAlert/index",
							badge: 0
						},
						{
							icon: "sic-shebeixunjian",
							iconColor: "#8B008B",
							title: "设备巡检",
							toRouteName: "/pages/todoTask/deviceCycleCheckRecordAlert/index",
							badge: 0
						},
					]
				};
			},
			// filters: {
			// 	time(val) {
			// 		return dayjs(val * 1000).format('YYYY-MM-DD HH:mm:ss');
			// 	},
			// },
			async onShow(options) {
				await this.initData();
			},

			// 下拉刷新
			onPullDownRefresh() {
				// this.page = 1;
				// this.worksList = [];
				// this.loading = true;
				// this.getworksList('refresh');
				// this.getWorkTaskNum();
				this.getAlert();
			},
			// 加载更多
			onReachBottom() {
				// if (this.loadingType === 'nomore') return;
				// this.page++;
				// this.getworksList();
			},

			methods: {
				// 数据初始化
				initData() {
					// this.hasLogin = this.$mStore.getters.hasLogin;
					// this.page = 1;
					// this.worksList.length = 0;
					// this.getworksList();
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: this.pageStore.$state.themeColor.color,
						animation: {
							duration: 400,
							timingFunc: 'easeIn'
						}
					})

					//app
					// this.getWorkTaskNum();
					this.getAlert();
				},
				// 获取资料列表
				async getworksList(type) {
					if (!this.hasLogin) {
						this.loading = false;
						if (type === 'refresh') uni.stopPullDownRefresh();
						uni.removeTabBarBadge({
							index: this.$mConstDataConfig.worksIndex
						});
						return;
					}
					await this.$http.get(`${worksList}`, {
							page: this.page
						}).then(r => {
							this.loading = false;
							if (type === 'refresh') {
								uni.stopPullDownRefresh();
							}
							this.loadingType = r.data.length === 10 ? 'more' : 'nomore';
							this.worksList = [...this.worksList, ...r.data];
						})
						.catch(() => {
							this.loading = false;
							if (type === 'refresh') {
								uni.stopPullDownRefresh();
							}
						});
				},
				navToLogin(route) {
					this.$mRouter.push({
						route
					});
				},
				navTo(route) {
					this.$mRouter.push({
						route
					});
				},

				//app
				getWorkTaskNum() {
					request({
						url: config.baseUrl + getAuditToDo,
						method: 'get',
						data: {
							current: 1,
							size: 1000
						}
					}).then(res => {
						let data = res.data.data.records;
						let typeArr = [
							"process-type-fire",
							"process-type-space",
							"process-type-high",
							"process-type-elect",
							"process-type-groud",
							"process-type-dredge",
							"process-type-hoist",
							"process-type-road"
						];
						let workList = [];
						data.map(item => {
							if (typeArr.indexOf(item.processType) > -1) {
								workList.push(item);
							}
						});
						this.moudleList[0].badge = workList.length;
					});
				},
				getAlert() {
					request({
						url: config.baseUrl + getAlert,
						method: 'get',
						data: {
							current: 1,
							size: 1000
						}
					}).then(res => {
						console.log(res.data.data)
						this.moudleList[0].badge = res.data.data.training.length;
						this.moudleList[1].badge = res.data.data.certification.length;
						this.moudleList[2].badge = res.data.data.companyCert.length;
						this.moudleList[3].badge = res.data.data.material.length;
						this.moudleList[4].badge = res.data.data.device.length;
						this.moudleList[5].badge = res.data.data.hiddenHazardRectify.length;
						this.moudleList[6].badge = res.data.data.emergencyPractice.length;
						this.moudleList[7].badge = res.data.data.deviceMtnRecord?.length || 0;
						this.moudleList[8].badge = res.data.data.devicePointCheckRecord?.length || 0;
						this.moudleList[9].badge = res.data.data.devicePointCheckRecord?.length || 0;
						let sum = 0;
						this.moudleList.forEach(item => {
							sum += item.badge;
						})
						uni.setTabBarBadge({
							index: 1,
							text: sum + ''
						})
						uni.stopPullDownRefresh();
					}).catch(() => {
						this.$mHelper.toast('数据异常')
						uni.stopPullDownRefresh();
					});
				},
				toEnterPage(item) {
					if (item.key === 1) {
						this.$mRouter.push({
							route: item.toRouteName,
							query: {
								cycleCheckType: 2
							}
						});
					} else if (item.key === 2) {
						this.$mRouter.push({
							route: item.toRouteName,
							query: {
								cycleCheckType: 1
							}
						});
					} else {
						console.log('item', item.toRouteName)
						this.$mRouter.push({
							route: item.toRouteName
						});
					}
				},

			}
		};
	</script>

	<style lang="scss">
		page {
			background-color: #EEEEEE;
		}

		.visit {
			.uni-media-list-logo {
				width: 180rpx;
				height: 140rpx;
			}

			.uni-media-list-body {
				height: auto;
				justify-content: space-around;
			}

			.uni-media-list-text-top {
				height: 74rpx;
				font-size: 28rpx;
				overflow: hidden;
			}

			.uni-media-list-text-bottom {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

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

			.works-empty {
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

			.moudle-item {
				width: 25%;
			}

			.moudle-group {
				background: white;
				margin: 10px;
				border-radius: 5px;
				height: 480px;
				margin-top: 0px;
				border-top-left-radius: 0px;
				border-top-right-radius: 0px;
			}
		}

		.title-bar {
			margin: 10px;
			margin-bottom: 0;
			padding-top: 10px;
			background-color: white;

			.title {
				// border-left: 2px solid #377FF6;
				text-indent: 8px;
				font-size: 14px;
				font-weight: bold;
				color: #333333;

				span {
					margin-left: 10px;
				}
			}
		}
	</style>