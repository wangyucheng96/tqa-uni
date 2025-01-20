<template>
	<view class="body-view">
		<!-- 使用scroll-view实现tabs滑动切换 -->
		<scroll-view class="top-menu-view" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
			<view class="menu-topic-view" v-for="(item,index) in tabs" :id="'tabNum'+item.id" :key="index" @click="swichMenu(index)">
				<view :class="currentTab==index ? 'menu-topic-act' : 'menu-topic'">
					<text class="menu-topic-text">{{item.name}}</text>
					<view class="menu-topic-bottom">
						<view class="menu-topic-bottom-color"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 内容 -->
		<swiper class="swiper-box-list" :current="currentTab" @change="swiperChange">
			<swiper-item class="swiper-topic-list" v-for="item in swiperDateList" :key="item.id">
				<view class="swiper-item">
					{{item.content}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import DB from "@/utils/sqlite/sqlite.js";
	export default {
		data() {
			return {
				scrollLeft:0,
				// tabs: [{
				// 		id: 1,
				// 		name: '选项卡一'
				// 	},
				// 	{
				// 		id: 2,
				// 		name: '选项卡二'
				// 	},
				// 	{
				// 		id: 3,
				// 		name: '选项卡三'
				// 	},
				// 	{
				// 		id: 4,
				// 		name: '选项卡四'
				// 	},
				// 	{
				// 		id: 5,
				// 		name: '选项卡五'
				// 	},
				// 	{
				// 		id: 6,
				// 		name: '选项卡六'
				// 	},
				// 	{
				// 		id: 7,
				// 		name: '选项卡七'
				// 	},
				// ],
// 				tabs:[
//     {
//         "id": 1,
//         "name": "KZ-1AB02-Y33-推进控制舱段"
//     },
//     {
//         "id": 2,
//         "name": "KZ-1AB02-Y33-推进控制舱段"
//     },
//     {
//         "id": 3,
//         "name": "KZ-1AB02-Y34-推进控制舱段"
//     },
//     {
//         "id": 4,
//         "name": "KZ-11-Y35-推进控制舱段"
//     }
// ],
				tabs:[{}],
				currentTab: 0,
				tabCurrent: 'tabNum1',
				// Tab切换内容
				swiperDateList: [{
						id: 1,
						content: '选项卡1页面'
					},
					{
						id: 2,
						content: '选项卡2页面'
					},
					{
						id: 3,
						content: '选项卡3页面'
					},
					{
						id: 4,
						content: '选项卡4页面'
					},
					{
						id: 5,
						content: '选项卡5页面'
					},
					{
						id: 6,
						content: '选项卡6页面'
					},
					{
						id: 7,
						content: '选项卡7页面'
					},
				],
			}
		},
		onLoad() {
			const dbTablesql = "task";
			//const lname = "'projectname'";
			DB.selectTableData(dbTablesql).then((res) => {
			  console.log('res',res);	
					  // 处理数据
			  const result = res.map((item, index) => ({
					id: index + 1, // 使用 task_id 作为 id
					name: `${item.product_code}-${item.product_name}-${item.part_code}` // 拼接 product_code, product_name, part_code
			   }));			
			   console.log(result);
			   this.tabs = result;
			  }).catch((err) => {
			  console.error("查询task失败", err);
			  this.$mHelper.toast("查询task失败");
			  this.btnLoading = false;
			});
			

		},
		methods: {
			swichMenu(id) {
				this.currentTab = id
				console.log(11,id)
				//this.tabCurrent = 'tabNum'+ id
				
				// 滑动swiper后，每个选项距离其父元素最左侧的距离
				this.scrollLeft = 0;
				for (let i = 0; i < id; i++) {
					this.scrollLeft += 60
					console.log(this.scrollLeft ,60,id)
				};
			},
			swiperChange(e) {
				console.log(22,e.detail.current)
				let index = e.detail.current
				this.swichMenu(index)
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.body-view {
		width: 100%;
		overflow: hidden;
	}

	.top-menu-view {
		display: flex;
		position: fixed;
		z-index:100;
		//top: 84rpx;
		/* #ifdef H5 */
		top: 84rpx;
		/* #endif */
		/* #ifndef H5 */
		top: 0rpx;
		/* #endif */
		left: 0;
		white-space: nowrap;
		width: 100%;
		background-color: #fceeee;
		height: 86rpx;
		line-height: 86rpx;
		border-top: 1rpx solid #d8dbe6;

		.menu-topic-view {
			display: inline-block;
			white-space: nowrap;
			height: 86rpx;
			position: relative;

			.menu-topic-text {
				font-size: 30rpx;
				color: #303133;
				padding: 10rpx 40rpx;
				font-weight: 500;
			}

			.menu-topic-bottom {
				position: absolute;
				bottom: 0;
				width: 100%;

				.menu-topic-bottom-color {
					width: 40rpx;
					height: 4rpx;
				}
			}

			.menu-topic-act .menu-topic-bottom {
				display: flex;
				justify-content: center;
			}
			.menu-topic-act .menu-topic-text{
				color:#ff0000;
			}
			

			.menu-topic-act .menu-topic-bottom-color {
				background: #ff0000;
			}
		}
	}

	.swiper-box-list {
		width: 95%;
		margin: 100rpx auto 30rpx;
		padding:20rpx 40rpx;
		flex:1;
		background-color: #FFFFFF;
		height: calc(100vh - 251rpx);
		.swiper-topic-list {
		     width: 100%;
		 }
	}
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>
