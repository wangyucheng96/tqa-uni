<template>
	<view class="notify">
		<view class="promotion-center1">
			<image :src="advList[0].cover" mode="aspectFill" style="width: 100vw;height: 150px;"></image>
		</view>
		<view class="promotion-center">
			<!--  智能巡检  -->
			<view class="group-item" v-for="(title, i) in appTitle" :key="title.text">
				<list-cell navigateType="" :title="title.text">
				</list-cell>
				<view class="category-list">
					<view class="category" v-for="(item, j) in shortcuts[title.text]" :key="j"
						@tap.stop="navTo(item.url)">
						<view>
							<view class="img">
								<text class="t-icon" :class="[item.icon]"></text>
								<!-- <iconfont-svg :icon="item.icon" size="36"></iconfont-svg> -->
							</view>
							<view class="text">{{ item.title }}</view>
						</view>
					</view>
				</view>
			</view>


			<!-- 系统管理 -->
			<!-- <list-cell icon="iconliebiaoqiehuan" :iconColor="themeColor.color" navigateType=""  title="系统管理"></list-cell>
			<view class="category-list">
				<view class="category" v-for="(item, index) in systemList" :key="index" @tap.stop="navTo(item.url)">
					<view >
						<view class="img">
							<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
						</view>
						<view class="text">{{ item.title }}</view>
					</view>
				</view>
			</view> -->

			<!-- 开发平台 -->
			<!-- <list-cell icon="iconzongjie" :iconColor="themeColor.color" navigateType=""  title="开发平台"></list-cell>
			<view class="category-list">
				<view class="category" v-for="(item, index) in genList" :key="index" @tap.stop="navTo(item.url)">
					<view >
						<view class="img">
							<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
						</view>
						<view class="text">{{ item.title }}</view>
					</view>
				</view>
			</view> -->

			<!-- 业务中心 -->
			<!-- <list-cell icon="iconfenlei" :iconColor="themeColor.color" navigateType=""  title="工作流"></list-cell>
			<view class="category-list">
				<view class="category" v-for="(item, index) in worksList" :key="index" @tap.stop="navTo(item.url)">
					<view >
						<view class="img">
							<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
						</view>
						<view class="text">{{ item.title }}</view>
					</view>
				</view>
			</view> -->

			<!-- 日常管理 -->
			<!-- <list-cell icon="iconyingyong" :iconColor="themeColor.color" navigateType=""  title="日常管理" ></list-cell>
			<view class="category-list">
				<view class="category" v-for="(item, index) in manageSectionList" :key="index" @tap.stop="navTo(item.url)">
					<view >
						<view class="img">
							<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
						</view>
						<view class="text">{{ item.title }}</view>
					</view>
				</view>
			</view> -->

			<!-- 其他应用 -->
			<!-- <list-cell icon="iconyingyong" :iconColor="themeColor.color" navigateType=""  title="其他应用" ></list-cell>
			<view class="category-list" >
				<view class="category" v-for="(item, index) in otherSectionList" :key="index" @tap.stop="navTo(item.url)">
					<view >
						<view class="img">
							<text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text>
						</view>
						<view class="text">{{ item.title }}</view>
					</view>
				</view>
			</view> -->


		</view>
	</view>
</template>
<script>
	// import {memberInfo} from '@/api/userInfo';
	import dayjs from 'dayjs ';
	import mConstDataConfig from '@/config/constData.config';
	import listCell from '@/components/oa-list-cell';


	export default {
		components: {
			listCell,
		},

		data() {
			return {
				hasLogin: false,
				appTitle: this.$mConstDataConfig.appTitle,
				shortcuts: this.$mConstDataConfig.shortcuts,


				adminList: this.$mConstDataConfig.adminList,
				systemList: this.$mConstDataConfig.systemList,
				genList: this.$mConstDataConfig.genList,
				worksList: this.$mConstDataConfig.worksList,
				manageSectionList: this.$mConstDataConfig.manageSectionList,
				otherSectionList: this.$mConstDataConfig.otherSectionList,
				advList: [{
					"id": "1",
					"adv_title": "",
					"cover": "/static/img/carousel2.png"
				}], // 广告图
			};
		},
		filters: {},
		onShow() {
			this.initData();
		},
		computed: {
			bottom() {
				let bottom = 0;
				/*  #ifdef H5  */
				bottom = 90;
				/*  #endif */
				return bottom;
			},
		},
		mounted() {
			// 权限
			this.appTitle.map((item) => {
				this.shortcuts[item.text].map((s) => {
					if (this.pageStore.$state.permissions[s.product] || s.product === 'all') {
						s.show = true;
					} else {
						s.show = false;
					}
				})
			})
			this.appTitle.forEach((item) => {
				let flag = false
				this.shortcuts[item.text].forEach((s) => {
					if (s.show) {
						flag = true
					}
				})
				item.show = flag
			})
			this.appTitle = this.appTitle.filter((item) => {
				if (item.show) {
					return item
				}
			})
			this.appTitle.map((item) => {
				this.shortcuts[item.text] = this.shortcuts[item.text].filter((s) => {
					if (s.show) {
						return s
					}
				})
			})
		},
		methods: {
			// 数据初始化
			initData() {
				this.hasLogin = true;
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.pageStore.$state.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				})
			},

			// 统一跳转接口,拦截未登录路由
			navTo(route) {
				if (!route) return;
				if (!this.hasLogin) {
					uni.removeStorageSync('backToPage');
					this.$mRouter.push({
						route: '/pages/public/login'
					});
				} else {
					this.$mRouter.push({
						route
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

	.notify {
		.promotion-center {
			background: #fff;
			margin: 10px;
			border-radius: 5px;

			// border-radius: 10px;
			.group-item {
				.content {

					::v-deep.b-b:after,
					.b-t:after {
						content: none;
					}

					::v-deep.mix-list-cell {
						position: relative;
						padding: 10px 20px 0;

						.cell-tit {
							font-weight: bold;
							// color: #333;
						}

						.cell-tit::before {
							position: absolute;
							content: '';
							width: 2px;
							height: 14px;
							// background: #377FF6;
							top: 18px;
							left: 12px;
						}
					}
				}
			}

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 20px 0;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 25%;
					margin-top: 15px;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;
						line-height: 1.3;

						.iconfont {
							font-size: $font-lg + 40upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 12px;
						font-weight: 400;
						// color: #333;
						text-align: center;
						padding: 0 10px;
						// white-space:nowrap;
						margin-top: 8px;
					}
				}
			}

		}
	}
</style>