<template>
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
	
	<view class="container">
		<tree-item :treeData="treeData" @select="onSelect"></tree-item>
	</view>
</template>

<script>
	
import TreeItem from './TreeItem.vue';
import DB from "@/utils/sqlite/sqlite.js";
import { EventBus } from '@/eventBus.js';

export default {
	name: 'TreeSelector',
	components: {
		TreeItem
	},
	
	data() {
		return {
			treeData: [
			
			/*
			{
				label: 'KZ-1A',
				level: 0,
				expanded: false,
				completed: true, // 添加 completed 字段
				children: [{
					label: '推进控制舱',
					level: 1,
					completed: true, // 添加 completed 字段
				},
				{
					label: '后罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				
				{
					label: '前罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '仪器舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '姿态舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				]},
			
			{
				label: 'KZ-11',
				level: 0,
				expanded: false,
				completed: true, // 添加 completed 字段
				children: [{
					label: '推进控制舱',
					level: 1,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '后罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '前罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '仪器舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '姿态舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				
				]
			},
			{
				label: 'KZ-6',
				level: 0,
				expanded: false,
				completed: false, // 添加 completed 字段
				children: [{
					label: '推进控制舱',
					level: 1,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '后罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '前罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '仪器舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '姿态舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				
				]
			},
			{
				label: 'KZ-16',
				level: 0,
				expanded: false,
				completed: false, // 添加 completed 字段
				children: [{
					label: '推进控制舱',
					level: 1,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '后罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '前罩',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '仪器舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				{
					label: '姿态舱',
					level: 1,
					expanded: false,
					completed: true, // 添加 completed 字段
					children: [{
						label: '工序1',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						},
						{
							label: '工步2',
							level: 3,
							completed: true // 添加 completed 字段
						}
						]
					},
					{
						label: '工序2',
						level: 2,
						completed: true ,// 添加 completed 字段
						children: [{
							label: '工步1',
							level: 3,
							completed: true // 添加 completed 字段
						}]
					}
					]
				},
				]
			}*/
			
			],
			current: 0,
			advList:[{}],
		}
	},
	
	onLoad(){
		this.fetchTreeData();
	},
	methods: {
		onSelect(item) {
			console.log('Selected:', item)
			this.navTo("/pages/taskExecution/detail_z");
			// uni.showToast({
			// 	title: `已选择: ${item.label}`,
			// 	icon: 'none'
			// })
		},
		navTo(route) {
			this.$mRouter.push({
				route
			});
		},
		async fetchTreeData() {
			// 查询表
			// const tableA = await DB.selectTableData("task");
			const tableB = await DB.selectTableData("task_item");
			// 连接表
			// const flatData = this.performJoinOperation(tableA, tableB);
			console.log("查询结果已存储到 flatData 中：", tableB);
			// 将扁平化数据转换为树形结构
			this.treeData = this.transformToTree(tableB);
			EventBus.$emit('update:tree', this.treeData); // 发送数据
			console.log(this.treeData);
		},
		async performJoinOperation(tableA, tableB) {
			const joinedData = [];
			if (!tableA || !tableB) {
			  console.error("Data not loaded yet");
			} else {
			      // Step 1: 遍历 tableA，合并 tableB 中的匹配项
				tableA.forEach((a) => {
			        const b = tableB.find((item) => item.item_id === a.item_id);
			        joinedData.push({
			          id: a.id,
			          name: a.name,
			          fieldA1: a.fieldA1,
			          fieldA2: a.fieldA2,
			          fieldB1: b ? b.fieldB1 : null,
			          fieldB2: b ? b.fieldB2 : null
			        });
			      });
			      // Step 2: 遍历 tableB，添加未在 tableA 中找到匹配项的记录
			      tableB.forEach((b) => {
			        const a = tableA.find((item) => item.item_id === b.item_id);
			        if (!a) {
			          joinedData.push({
			            id: b.id,
			            name: b.name,
			            fieldA1: null,
			            fieldA2: null,
			            fieldB1: b.fieldB1,
			            fieldB2: b.fieldB2
			          });
			        }
			      });		
			/*
			// 将 tableB 转换为 Map，便于快速查找
			const mapB = new Map(tableB.map(item => [item.task_id, item]));
			// 遍历 tableA，合并字段
			const joinedData = tableA.map(itemA => {
				const itemB = mapB.get(itemA.task_id); // 根据 id 查找 tableB 中的匹配项
				return {
				...itemA, // tableA 的字段
				...itemB  // tableB 的字段（如果存在）
				};		
		});*/
			console.log('连表结果：' ,joinedData);
			return joinedData;
		    };
		},
		transformToTree(flatData) {
			
		    const map = {}; // 用于存储每个节点的引用
		    const tree = []; // 最终的树形结构	
		    // 第一次遍历：创建节点对象
		    flatData.forEach((item) => {
			  // item.label = item.taskname; //标签
			  item.level = item.level;//所处层级
			  item.isExpanded = true; // 添加展开状态
			  item.completed = false;  //是否完成
			  item.children = []; // 添加 children 属性
		      map[item.task_id] = item; // 存储节点引用		

		    });	
		    // 第二次遍历：构建树形结构
		    flatData.forEach((item) => {
		      if (item.parent_id) {
		        const parent = map[item.parent_id];
		        if (parent) {
		          parent.children.push(map[item.task_id]); // 将当前节点添加到父节点的 children 中
		        }
		      } else {
		        tree.push(map[item.task_id]); // 根节点直接添加到树中
			  }
		    });
		    return tree;
		  },

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