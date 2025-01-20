<template>
	<view class="notify">
		<view class="promotion-center1">
			<!-- <image :src="advList[0].cover" mode="aspectFill" style="width: 100vw;height: 150px;"></image> -->
			<view class="tj-sction">
				<!-- 轮播图1 -->
				<view class="swiper">
					<view class="swiper-box">
						<oa-swipe-dot :info="advList" mode="nav" :current="current" field="adv_title">
							<swiper @change="handleDotChange" autoplay="true">
								<swiper-item v-for="(item, index) in advList" :key="index">
									<view class="swiper-item">
										<image :src="item.cover" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
						</oa-swipe-dot>
					</view>
				</view>
			</view>
		</view>
		<view class="index-bottom" :style="moudleList.length<16?'height:480px':''">
			<view class="moudle-group">
				<view class="moudle-item" v-for="(item, index) in moudleList" :key="index"
					@click="navToLogin(item.url)">
					<view class="badge" v-if="item.badge">
						{{ item.badge }}
					</view>
					<view class="icon" style="line-height:1">
						<image :src="item.icon" style="width: 60upx; height: 60upx;"></image>
						<!-- <iconfont-svg :icon="item.icon" size="30"></iconfont-svg> -->
					</view>
					<view class="title" style="margin-top: 8px;">{{ item.title }}</view>
				</view>
			</view>
		</view>

		<!--页面加载动画-->
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>

</template>
<script>
	import listCell from '@/components/oa-list-cell';
	import oaSwipeDot from '@/components/oa-swipe-dot';
	import rfSwiperSlide from '@/components/oa-swiper-slide';

	import {
		request
	} from '@/utils/request/request2';
	import config from '@/config/index.config';
	export default {
		components: {
			listCell,
			oaSwipeDot,
			rfSwiperSlide
		},
		data() {
			return {
				current: 0, // 轮播图index
				advList: [{
						"id": "1",
						"adv_title": "",
						"cover": "/static/img/carousel1.png"
					},
					{
						"id": "2",
						"adv_title": "",
						"cover": "/static/img/carousel2.png"
					},
					{
						"id": "3",
						"adv_title": "",
						"cover": "/static/img/carousel3.png"
					}
				], // 广告图
				loading: true,
				moudleList: [{
					"title": "数据导入",
					"icon": "/static/icons/row1-1.png",
					"url": "/pages/dataImport/index",
					"product": "all",
					"show": true,
					"checked": true
				},
				{
					"title": "任务执行",
					"icon": "/static/icons/row1-2.png",
					"url": "/pages/taskExecution/index",
					"product": "all",
					"show": true,
					"checked": true
				},
				{
					"title": "数据同步",
					"icon": "/static/icons/row1-3.png",
					"url": "/pages/dataSynchronization/index",
					"product": "all",
					"show": true,
					"checked": true
				},
				{
					"title": "基础设置",
					"icon": "/static/icons/row2-1.png",
					"url": "/pages/set/set",
					"product": "all",
					"show": true,
					"checked": true
				}],
				alertNum: 0
			};
		},
		watch: {
			'pageStore.$state.userInfo': function() {
				this.initData()
			},
		},
		onLoad() {
			// 检查本地存储中是否有 userinfo 信息
			const userInfo = uni.getStorageSync('userInfo');
			if (!userInfo) {
				// 如果没有 userinfo，跳转到登录页面
				uni.reLaunch({
					url: '/pages/public/login'
				})
				return;
			}
			// 如果有 userinfo，继续初始化数据
			this.initData();
		},
		filters: {
			notifyTypeFilter(val) {
				return '公告';
			}
		},
		onShow() {
			// this.moudleList = this.pageStore.$state.commonModules.filter((item) => item.checked);
			// console.log('init---', this.moudleList)

			this.initData();
		},
		computed: {
			bottom() {
				let bottom = 0;
				/*  #ifdef H5  */
				bottom = 90;
				/*  #endif */
				return bottom;
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			// this.loading = true;
		},
		methods: {
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current;
			},
			// 数据初始化
			initData() {
				let userInfo = this.pageStore.userInfo
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.pageStore.$state.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				})
				this.loading = false;
			},
			// 通用跳转
			async navTo(item) {
				this.$mRouter.push({
					route: `/pages/notice/detail?id=${item}`
				});
			},

			// 通用跳转
			navToLogin(route) {
				this.$mRouter.push({
					route
				});
			},
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #EEEEEE;
	}

	/*轮播图*/
	.swiper {
		width: 100%;
		margin-top: 20upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 100%;
			height: 40vw;
			overflow: hidden;
			// border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}
		}
	}

	.notify {
		// margin:0px !important;
		margin-top: -10px;

		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.promotion-center1 {
			// margin: 10px;
		}

		.promotion-center2 {
			margin: 0 10px 10px;
			background: #FFFFFF;
			border-radius: 8px 8px 8px 8px;

			::v-deep.b-b:after,
			.b-t:after {
				content: none;
			}
		}

		.header {
			width: 100%;
			padding-left: $font-lg;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 10;
			background-color: #fff;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);

			/*  #endif  */
			.title {
				font-size: 36upx;
			}
		}

		.place {
			background-color: #ffffff;
			height: 100upx;
			/*  #ifdef  APP-PLUS  */
			margin-top: var(--status-bar-height);
			/*  #endif  */
		}

		.notify-list {
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
				padding: $spacing-base $spacing-lg $spacing-base 80upx;
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
			top: 50;
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


	.index-bottom {
		background-color: white;
		margin: 10px;
		border-radius: 5px;

		// height: 400px;
		.title-bar {
			margin: 10px;

			.title {
				// border-left: 2px solid #377FF6;
				text-indent: 8px;
				font-size: 14px;
				font-weight: bold;
				color: #333333;
				line-height: 3;
			}
		}

		.moudle-group {
			.moudle-item {
				width: 30%;
				padding-top: 50upx;
			}
		}
	}
</style>