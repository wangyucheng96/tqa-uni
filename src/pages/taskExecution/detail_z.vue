<template>
	<view >
		<view >
			<uni-title :title="暂定测试"  align="center" ></uni-title>
		</view>
	</view>
	<view class="container"  >
		<view class="section" >
			<text class="label">型号名称</text>
			<text class="value">CZ-1AB02</text>
		</view>
		<view class="section">
			<text class="label">任务名称</text>
			<text class="value">测试舱段</text>
		</view>
		<view class="section">
			<text class="label">工艺编号</text>
			<text class="value"> P6200548 </text>
		</view>
		<view class="section">
			<text class="label">操作人</text>
			<text class="value"> 质检工人 </text>
		</view>
	</view>
	<view class="container" >
		<!-- 步骤显示 -->
		<uni-section  type="line"  >
			<uni-steps :options="list1" active-icon="medal" :active="active" />
			<view v-for="(step, index) in list1" :key="index" class="uni-steps" @click="handleStepClick(index)">{{ step.title }}
				<!-- <button type="primary" size="mini" style="margin: 5px 5px; width: 100px;">{{ step.title }}</button> -->
			</view>
		</uni-section>
		<!-- <button type="primary" size="mini" style="margin: 30px 10px; width: 100px;" @click="change">改变状态</button> -->
	</view>
	
	<l-collapse :accordion="true" >
	        <l-collapse-item title="工步1" :open="false"  titleImg="">
					
				<!-- 内容 -->
	            <view class="container">
	            <view class="section">
	            	<text class="label">产品：</text>
	            	<text class="value">Z2022-2012 弹条/W型</text>
	            </view>
	            <view class="section">
	            	<text class="label">名称：</text>
	            	<text class="value">0003827-10 淬火硬度</text>
	            </view>
	            <view class="section">
	            	<text class="label">定量/定性：</text>
	            	<text class="value">定量</text>
	            </view>
	            <view class="section">
	            	<text class="label">取值：</text>
	            	<text class="value">62.00,[60.00,63.00](洛氏硬度(HRA))</text>
	            </view>
	            <view class="section">
	            	<text class="label">小数位：</text>
	            	<text class="value">2</text>
	            </view>
	            <view class="section">
	            	<text class="label">是否委托：</text>
	            	<text class="value">否</text>
	            </view>
	            <view class="section">
	            	<text class="label">数量：</text>
	            	<text class="value">3</text>
	            </view>
	            <view class="section">
	            	<text class="label">计算单位：</text>
	            	<text class="value">洛氏硬度(HRA)</text>
	            </view>
	            <view class="section">
	            	<text class="label">状态：</text>
	            	<text class="value">待委托</text>
	            </view>
	            <view class="section">
	            	<text class="label">必须上传附件：</text>
	            	<text class="value">是</text>
	            </view>
	            
	            <!-- Form Section -->
	            <uni-forms ref="form" :model="formData" :rules="rules">
	            	<!-- Judge Section -->
	            	<uni-forms-item label="判定：" name="judge">
	            		<uni-data-checkbox v-model="formData.judge" :localdata="sex"></uni-data-checkbox>
	            	</uni-forms-item>
	            	<!-- Quantity Inputs -->
	            	<uni-forms-item label="合格数量：" name="qualifiedQuantity">
	            		<uni-number-box v-model="formData.qualifiedQuantity" />
	            	</uni-forms-item>
	            	<uni-forms-item label="不合格数量：" name="unqualifiedQuantity">
	            		<uni-number-box v-model="formData.unqualifiedQuantity" />
	            	</uni-forms-item>
	            
	            	<!-- Attachment Upload -->
	            	<uni-forms-item label="附件：" name="attachments">
	            		<view class="upload-box">
	            			<uni-file-picker limit="9" title="最多选择9张图片" file-mediatype="image" return-type="object"
	            				@select="handleFileSelect" @success="handleFileSuccess"
	            				v-model="formData.attachments"></uni-file-picker>
	            		</view>
	            	</uni-forms-item>
	            
	            	<!-- Remark Section -->
	            	<uni-forms-item label="备注：" name="remark">
	            		<textarea class="remark-input" v-model="formData.remark" placeholder="请输入"></textarea>
	            	</uni-forms-item>
	            
	            	<!-- Submit Button -->
	            	<button class="submit-button" @click="submitForm" style="height: 40px;line-height: 40px;">完成</button>
	            </uni-forms>
				</view>
	        </l-collapse-item>
			
	        <l-collapse-item title="工步2" :open="false" titleImg="">
	        	            <view class="container">
	        	            <view class="section">
	        	            	<text class="label">产品：</text>
	        	            	<text class="value">Z2022-2012 弹条/W型</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">名称：</text>
	        	            	<text class="value">0003827-10 淬火硬度</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">定量/定性：</text>
	        	            	<text class="value">定量</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">取值：</text>
	        	            	<text class="value">62.00,[60.00,63.00](洛氏硬度(HRA))</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">小数位：</text>
	        	            	<text class="value">2</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">是否委托：</text>
	        	            	<text class="value">否</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">数量：</text>
	        	            	<text class="value">3</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">计算单位：</text>
	        	            	<text class="value">洛氏硬度(HRA)</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">状态：</text>
	        	            	<text class="value">待委托</text>
	        	            </view>
	        	            <view class="section">
	        	            	<text class="label">必须上传附件：</text>
	        	            	<text class="value">是</text>
	        	            </view>
	        	            
	        	            <!-- Form Section -->
	        	            <uni-forms ref="form" :model="formData" :rules="rules">
	        	            	<!-- Judge Section -->
	        	            	<uni-forms-item label="判定：" name="judge">
	        	            		<uni-data-checkbox v-model="formData.judge" :localdata="sex"></uni-data-checkbox>
	        	            	</uni-forms-item>
	        	            	<!-- Quantity Inputs -->
	        	            	<uni-forms-item label="合格数量：" name="qualifiedQuantity">
	        	            		<uni-number-box v-model="formData.qualifiedQuantity" />
	        	            	</uni-forms-item>
	        	            	<uni-forms-item label="不合格数量：" name="unqualifiedQuantity">
	        	            		<uni-number-box v-model="formData.unqualifiedQuantity" />
	        	            	</uni-forms-item>
	        	            
	        	            	<!-- Attachment Upload -->
	        	            	<uni-forms-item label="附件：" name="attachments">
	        	            		<view class="upload-box">
	        	            			<uni-file-picker limit="9" title="最多选择9张图片" file-mediatype="image" return-type="object"
	        	            				@select="handleFileSelect" @success="handleFileSuccess"
	        	            				v-model="formData.attachments"></uni-file-picker>
	        	            		</view>
	        	            	</uni-forms-item>
	        	            	<!-- Remark Section -->
	        	            	<uni-forms-item label="备注：" name="remark">
	        	            		<textarea class="remark-input" v-model="formData.remark" placeholder="请输入"></textarea>
	        	            	</uni-forms-item>
	        	            
	        	            	<!-- Submit Button -->
	        	            	<button class="submit-button" @click="submitForm" style="height: 40px;line-height: 40px;">完成</button>
	        	            </uni-forms>
	        	            </view>
	        	        </l-collapse-item> 
			
	        <l-collapse-item title="工步 3 " titleImg="">
				
				<view class="container">
	            </view>
	        </l-collapse-item>
	    </l-collapse>
	
</template>
	
<script>
	
import DB from "@/utils/sqlite/sqlite.js";
import LiuStepBar from '@/pages/taskExecution/LiuStepBar.vue';
	
	export default {
		components: {
			LiuStepBar
		},
		data() {
			return {
				active: 0,
				tempData:[],
				list2:[],
				list1:[],
				formData: {
					judge: 0,
					qualifiedQuantity: 0,
					unqualifiedQuantity: 0,
					attachments: [],
					remark: ''
				},
				sex: [{
						text: '合格',
						value: 0
					},
					{
						text: '返工检修',
						value: 1
					}
				],
				rules: {
					judge: {
						rules: [{
							required: true,
							errorMessage: '请选择判定'
						}]
					},
					qualifiedQuantity: {
						rules: [{
								required: true,
								errorMessage: '请输入合格数量'
							},
							{
								type: 'number',
								min: 0,
								errorMessage: '合格数量不能小于0'
							}
						]
					},
					unqualifiedQuantity: {
						rules: [{
								required: true,
								errorMessage: '请输入不合格数量'
							},
							{
								type: 'number',
								min: 0,
								errorMessage: '不合格数量不能小于0'
							}
						]
					},
					// attachments: {
					// 	rules: [
					// 		{
					// 			required: true,
					// 			errorMessage: '请上传附件'
					// 		}
					// 	]
					// },
					remark: {
						rules: [{
							maxLength: 200,
							errorMessage: '备注不能超过200个字符'
						}]
					}
				}
			};
			
		},
		
		onLoad(){
			this.fetchTreeData();
		},
		
		methods: {
			//步骤组件点击触发
			// clickStep(stepIndex) {
			//       console.log(`点击了第 ${stepIndex + 1} 步`);
			//       // 在这里执行其他逻辑，例如跳转到特定页面或显示详细信息
			// },
			//取工序名
			getGXName(data) {
				console.log('展示 工序 成功');
				this.list1 = data.filter(item => item.level === 2).map(item => ({ title: item.item_name }) ); // 筛选出 level === 2 的项
				console.log('工序', list1.type);
			},
			//取工步名
			getGBName(data) {
				console.log('展示 工步 成功');
				// this.list2 = data.filter(item => item.level === 3 && (item.parent_id === "TK0001NO1" || item.parent_id === "TK0001NO2"|| item.parent_id === "TK0001NO3")).map(item => ({ title: item.content_name }) ); // 筛选
				console.log('工步',list2);
			},
			//获取数据
			async fetchTreeData() {
				// 查询表
				const tableB = await DB.selectTableData("task_item");
				this.getGXName(tableB);
				this.getGBName(tableB);
				console.log('测试成功');
				// 将扁平化数据转换为树形结构
				// this.flatData = this.transformToTree(tableB);
				// console.log(this.flatData);
			},
			transformToTree(flatData) {
			    const map = {}; // 用于存储每个节点的引用
			    const tree = []; // 最终的树形结构	
			    // 第一次遍历：创建节点对象
			    flatData.forEach((item) => {
					if(item.level ===2|| item.level ===3){
						// item.label = item.taskname; //标签
						item.level = item.level;//所处层级
						item.isExpanded = false; // 添加展开状态
						item.completed = true;  //是否完成
						item.children = []; // 添加 children 属性
						map[item.task_id] = item; // 存储节点引用		
					}
			    });	
			    // 第二次遍历：构建树形结构
			    flatData.forEach((item) => {
					if(item.level ===2|| item.level ===3 ){
					  if (item.parent_id) {
						const parent = map[item.parent_id];
						if (parent) {
						  parent.children.push(map[item.task_id]); // 将当前节点添加到父节点的 children 中
						}
						  } else {
							tree.push(map[item.task_id]); // 根节点直接添加到树中
						}
					}
			    });
			    return tree;
			  },
			//自适应高度
			toggleContent() {
			      this.$nextTick(() => {
			        this.$refs.collapse.resize(); // 调用 resize 方法更新高度
			      });
			    },
			// 方法处理
			submitForm() {
				console.log('提交表单数据', this.formData)
				this.$refs.form.validate().then(res => {
					console.log('表单数据验证通过', res);
					// 提交表单数据
					this.$mRouter.back();
				}).catch(err => {
					console.log('表单数据验证失败', err);
				});
			},
			handleFileSelect(event) {
				console.log('选择的文件:', event.tempFiles);
				// 可以在这里处理选择的文件
			},
			handleFileSuccess(event) {
				console.log('上传成功的文件:', event.tempFiles);
				// 可以在这里处理上传成功的文件
			},
			navTo(route) {
				this.$mRouter.reLaunch({
					route
				});
			},
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			},
			// clickStep(stepIndex) {
			// 	console.log(`点击了第 ${stepIndex + 1} 步（liu-step-bar）`);
			// 	this.active = stepIndex; // 更新当前激活的步骤
			// },
			// handleStepClick(stepIndex) {
			// 	console.log(`点击了第 ${stepIndex + 1} 步（uni-steps）`);
			// 	this.active = stepIndex; // 更新当前激活的步骤
			// },
		},
		
		
	};
</script>
	
<style>
	.container {
		padding: 16px;
		background-color: #f5f5f5;
	}

	.header {
		background-color: #468dfc;
		padding: 12px;
		text-align: center;
		color: white;
		font-size: 18px;
	}

	.section {
		margin: 8px 0;
		display: flex;
		flex-direction: row;
	}

	.label {
		width: 100px;
		color: #333;
	}

	.value {
		color: #666;
	}

	.judge-section {
		margin: 16px 0;
	}

	.judge-title {
		font-weight: bold;
	}

	.judge-options {
		display: flex;
		justify-content: space-evenly
	}

	.option {
		padding: 8px 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.quantity-input {
		margin: 8px 0;
	}

	.input {
		width: 60px;
		border: 1px solid #ccc;
		text-align: center;
	}

	.attachment {
		margin: 16px 0;
	}

	.upload-box {
		display: flex;
		gap: 8px;
	}

	.upload-item {
		width: 60px;
		height: 60px;
		border: 1px dashed #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-add {
		background-color: #f0f0f0;
		color: #999;
	}

	.remark {
		margin: 16px 0;
	}

	.remark-input {
		width: 100%;
		height: 80px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 8px;
	}

	.submit-button {
		width: 100%;
		background-color: #468dfc;
		color: white;
		text-align: center;
		border-radius: 4px;
		margin-top: 16px;
	}
	.status-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 92rpx;
		margin: 30rpx;
		background-color: #007AFF;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		
		flex-direction: row;
	}
	
	.uni-steps {
	  padding: 10px;
	  border-bottom: 1px solid #ccc;
	  cursor: pointer;
	}
	
	.step-item {
	  padding: 10px;
	  border-bottom: 1px solid #ccc;
	  cursor: pointer;
	}
	
	.step-item:last-child {
	  border-bottom: none;
	}
	
	.button {
	  margin: 30px 10px;
	  width: 100px;
	}
	
	
	
	
</style>