<template>
	<view class="container">
		<!-- Product Info -->
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
</template>

<script>
	export default {
		data() {
			return {
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
		methods: {
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
			}
		}
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
</style>