<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + pageStore.$state.themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box" @tap="isHasUserInfo">
					<image class="portrait" :src="headImg"></image>
					<text class="username">
						{{ userInfo.username || "登录" }}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box">
				<!-- 	<view class="b-btn">
					{{'系统管理员'}}
				</view> -->
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					
				</view>
				<text class="e-m">技术支持: http://www.yunyoucloud.com</text>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view class="cover-container" :style="[
        {
          transform: coverTransform,
          transition: coverTransition,
        },
      ]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" :src="arc"></image>
			<!-- 个人资料 -->
			<view class="set">
				<view class="list-cell b-b" :class="{ 'm-t': item.class === 'mT' }" v-for="item in setList"
					:key="item.title" @tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
					<text class="cell-tit">{{ item.title }}</text>
					<text class="cell-tip">{{ item.content }}</text>
					<text class="cell-more iconfont iconyou"></text>
				</view>
			</view>

			<!-- <view class="cu-list menu sm-border card-menu"> -->
			<!-- <view class="cu-item">
					<view class="content flex align-center">
						<text class="cuIcon-colorlens" :class="'text-' + themeColor.name"></text>
						<view class="padding solid radius shadow-blur" :class="'bg-' + themeColor.name"></view>
						<view class="title">主题色：<text :class="'text-' + themeColor.name">{{
							themeColor.title
						}}</text></view>
					</view>
					<view class="action">
						<button class="cu-btn round shadow" @click="showColorModal" :class="'bg-' + themeColor.name">
							<text class="cuIcon-colorlens"></text> 选择主题
						</button>
					</view>
				</view>
			</view> -->
			<!-- v-if="hasLogin" -->
			<view class="list-cell log-out-btn" :class="'text-' + pageStore.$state.themeColor.name" @tap="toLogout">
				<text class="cell-tit">退出登录</text>
			</view>
		</view>
	</view>
</template>
<script>
	import listCell from "@/components/oa-list-cell";
	//app
	// import {
	// 	getCompany
	// } from "@/api/userInfo.js";
	import {
		request
	} from "@/utils/request/request2";
	import config from "@/config/index.config";

	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
		},
		data() {
			return {
				colorModal: false,
				themeList: this.$mConstDataConfig.themeList,
				setList: this.$mConstDataConfig.setList,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				arc: this.$mAssetsPath.arc,
				coverTransform: "translateY(0px)",
				coverTransition: "0s",
				moving: false,
				userInfo: {},
				user: {},

				enterpriseName: ",",
			};
		},
		async onShow() {
			this.getCompanyInfo();
			// 初始化数据
			await this.initData();
		},
		onLoad() {
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === "ios") {
				this.CustomBar = 0;
			}
			// #endif
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo("/pages/set/set");
			} else if (index === 1) {}
		},
		// #endif
		methods: {
			isHasUserInfo() {
				console.log(this.userInfo.username,'this.usesrInfo.username')
				if (!this.userInfo.username) {
					navTo(`/pages/public/login`)
				}
			},
			handleClick() {
				uni.showModal({
					content: "确定要注销账户吗？",
					success: (e) => {
						if (e.confirm) {
							this.userInfo.password = null;
							this.userInfo.lockFlag = 1;
							console.log(this.userInfo);
							request({
									url: config.baseUrl + "/admin/user/edit",
									method: "put",
									data: this.userInfo,
								})
								.then((res) => {
									this.$mHelper.toast("注销成功");
									request({
										url: config.baseUrl + "/auth/token/logout",
										method: "DELETE",
									}).then((res) => {
										let temp = res.data.code;
										if (temp === 0) {
											setTimeout(() => {
												uni.reLaunch({
													url: "/pages/public/login",
												});
											}, 1000);
										}
									});
								})
								.catch((e) => {
									console.log(e);
								});
						}
					},
				});
			},
			//app
			// 退出登录
			toLogout() {
				uni.showModal({
					content: "确定要退出登录么",
					success: (e) => {
						if (e.confirm) {
							this.$mHelper.toast("已退出请重新登录");
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/public/login",
								});
							}, 1000);
							//清除所有存储
							// uni.clearStorageSync();
							//清除登录信息
							uni.removeStorageSync("userInfo");
							return
							request({
								url: config.baseUrl + "/auth/token/logout",
								method: "DELETE",
							}).then((res) => {
								let temp = res.data.code;
								if (temp === 0) {
									this.$mHelper.toast("已退出请重新登录");
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/public/login",
										});
									}, 1000);
								}
							});
						}
					},
				});
			},
			getCompanyInfo() {
				return
				
			},

			handleTip(isNewVersion) {
				this.isNewVersion = isNewVersion;
			},
			handleVersionUpgradeShow() {
				this.isVersionUpgradeShow = false;
			},
			// 数据初始化
			async initData() {
				// this.user = uni.getStorageSync('user');
				this.userInfo = uni.getStorageSync("userInfo");
				// this.profileInfo = userInfo
				// this.loading = false;
				if (this.userInfo.avatar) {
					this.headImg = this.getServerFilePath(this.userInfo.avatar);
				} else {
					return
					
					request({
							url: config.baseUrl + getAllUser,
							method: "get",
							params: {
								current: 0,
								size: 1,
								employeeNo: this.userInfo.username,
							},
						})
						.then((res) => {
							let data = res.data.data.records[0];
							this.userInfo.avatar = data.photo;
							if (this.userInfo.avatar) {
								this.headImg = this.getServerFilePath(this.userInfo.avatar);
							}
						})
						.catch((err) => {
							console.log("err", err);
						});
				}

				// 缓存大小
				this.setList[1].content = `${uni.getStorageInfoSync().currentSize} kb`;
				// #ifdef APP-PLUS
				this.setList[5].content = `当前版本 V1.0.0`;
				// #endif
				this.hasLogin = false;
				uni.setTabBarStyle({
					selectedColor: this.pageStore.$state.themeColor.color,
					borderStyle: "white",
				});
				uni.setNavigationBarColor({
					frontColor: "#ffffff",
					backgroundColor: this.pageStore.$state.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: "easeIn",
					},
				});
				// this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
				// 	uni.setTabBarItem({
				// 		index,
				// 		selectedIconPath
				// 	});
				// });
			},

			showColorModal() {
				this.colorModal = true;
			},
			SetColor(item) {
				this.colorModal = false;
				this.themeColor = item;
				this.pageStore.setThemeColor(item);
				uni.setNavigationBarColor({
					frontColor: "#ffffff",
					backgroundColor: this.pageStore.$state.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: "easeIn",
					},
				});
				uni.setTabBarStyle({
					selectedColor: this.pageStore.$state.themeColor.color,
					borderStyle: "white",
				});
				this.themeColor.tabList &&
					this.themeColor.tabList.forEach((selectedIconPath, index) => {
						uni.setTabBarItem({
							index,
							selectedIconPath,
						});
					});
			},

			// 统一跳转接口,拦截未登录路由
			navTo(route) {
				if (!route) return;
				if (route === "clearCache") {
					uni.showModal({
						content: "确定要清除缓存吗",
						success: (e) => {
							if (e.confirm) {
								uni.clearStorageSync();
								this.setList[1].content = "0 kb";
								this.pageStore.login(this.user);
								this.$mHelper.toast("清除缓存成功");
							}
						},
					});
					return;
				} else if (route === "versionUpgrade") {
					this.isVersionUpgradeShow = true;
					if (this.isNewVersion) {
						this.$mHelper.toast("已经是最新版本");
					}
					return;
				} else {
					this.$mRouter.push({
						route,
					});
				}
			},

			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = "transform .1s linear";
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}
				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = "transform 0.3s cubic-bezier(.21,1.93,.53,.64)";
				this.coverTransform = "translateY(0px)";
			},
		},
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: #eeeeee;
	}

	.list-cell.b-b {

		&:nth-child(2),
		&:nth-child(5) {
			&:after {
				border: none;
			}
		}
	}

	.user {
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

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.no-foot-print {
			text-align: center;
			padding: 48upx 0;

			.no-foot-print-icon {
				font-size: $font-lg + 2upx;
				margin-right: 10upx;
			}
		}

		.set {
			padding: $spacing-base 0;
		}

		.cu-list.card-menu {
			margin: $spacing-base 0;

			.title {
				margin-left: $spacing-base;
			}
		}

		.user-section {
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}

			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;

				.portrait-box {
					display: flex;
					align-items: center;

					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: $font-lg + 6upx;
						color: $color-white;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: $font-lg + 6upx;
						color: $font-color-dark;
						border: none;
					}

					button::after {
						border: none;
					}
				}
			}

			.vip-card-box {
				display: flex;
				flex-direction: column;
				color: #f7d680;
				height: 240upx;
				background: url("/static/vip-card.png");
				background-size: 100% 100%;
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;

				.b-btn {
					position: absolute;
					right: 24upx;
					top: 24upx;
					width: 160upx;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size: 22upx;
					color: #36343c;
					border-radius: 20px;
					background: linear-gradient(to left, #f9e6af, #ffd465);
					z-index: 1;
				}

				.tit {
					font-size: $font-base + 2upx;
					color: #f7d680;
					margin-bottom: 28upx;

					.iconfont {
						color: #f6e5a3;
						display: inline-block;
						margin-right: 16upx;
					}
				}
			}
		}

		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: $page-color-base;

			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}

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

			.tj-sction {
				@extend %section;
				display: flex;

				.tj-item {
					@extend %flex-center;
					flex: 1;
					flex-direction: column;
					margin: 30upx 0;
					font-size: $font-sm;
					color: #75787d;
					/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
				}

				/*.tj-item:last-child {*/
				/*border-right: none;*/
				/*}*/
				.num {
					font-size: $font-base;
				}

				.red {
					color: $base-color;
				}
			}
		}
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		justify-content: space-around;
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.icon .mix-list-cell.b-b:after {
		left: 90upx;
	}

	.mix-list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			align-self: center;
			width: 56upx;
			max-height: 60upx;
			font-size: 38upx;
		}

		.cell-more {
			align-self: center;
			font-size: 30upx;
			color: $font-color-base;
			margin-left: $uni-spacing-row-sm;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-sm + 2upx;
		}
	}
</style>