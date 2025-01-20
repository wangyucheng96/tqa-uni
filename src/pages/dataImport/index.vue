<template>
	<view class="container">
		<view class="historyImport-wrapper">
			<view class="historyImport">
				历史导入信息
			</view>
		</view>
		<view class="equipment-wrapper">
			<view class="equipment">
				设备已连接
			</view>
		</view>
		<view class="import-btn-wrapper">
			<button class="import-btn" type="primary" @click="handleImport">
				立即导入
			</button>
		</view>
		<view class="info-text">
			<view class="updateText">数据更新时间为：
				<span class="updateTime">{{ updateTime }}</span>
			</view>
		</view>
		
		<view class="progressBar" v-if="showImportText">
			<view class="isUpdate">正在导入</view>
			<piaoyiProgressBar :progress="progress" backgroundColor="#EFEFF4" progressBackgroundColor="#07C160"
				:showText="true" textColor="#fff" :textSize="24" :height="50"></piaoyiProgressBar>
		</view>
	</view>
</template>

<script>
import piaoyiProgressBar from '@/uni_modules/piaoyi-progress-bar/components/piaoyi-progress-bar/piaoyi-progress-bar.vue';
import * as XLSX from 'xlsx';;
import DB from "@/utils/sqlite/sqlite.js";
export default {
	components: {
		piaoyiProgressBar
	},
	data() {
		return {
			updateTime: '2024.12.12 12:12:12', // 初始化数据更新时间
			showImportText: false,
			progress: 0, // 进度条初始值
			progressInterval: null ,// 定时器
			fileName: '',
			filePath: '',
			s_path: ''
		};
	},
	methods: {
		
		onSelect(e) {
		      this.filePath = e.tempFiles[0].path;
		    },
		handleImport() {
			plus.io.chooseFile({
				title: '选择文件',
				filetypes: ['xls', 'xlsx'], // 允许的文件类型
				multiple: false, // 是否允许多选
			  }, (e) => {
				const tempFilePaths = e.files[0];
				this.filePath = tempFilePaths.trim();
				console.log('filePath:',this.filePath);
				uni.saveFile({
				            tempFilePath: 'file://'+this.filePath,
				            success: function (res) {
				                const savedFilePath = res.savedFilePath;
				                console.log('文件已保存到：' , savedFilePath);
								this.s_path = savedFilePath;
								console.log('s_path11111：',this.s_path);
						
								plus.io.resolveLocalFileSystemURL(savedFilePath, (entry) => {
									console.log('savedFilePath：',savedFilePath);
									console.log('entry：',entry);
									var fileReader = null;
								  entry.file((file) => {
									fileReader = new plus.io.FileReader();
									console.log("getFile:" + JSON.stringify(file));
									//fileReader.readAsDataURL(file);
								    fileReader.onloadend = function(evt) {
								    	console.log('evt',evt);
								        var data = evt.target.result;
										console.log(data);
										
										const base64Data = data.split(',')[1];
										
										const workbook = XLSX.read(base64Data, { type: 'base64' });
										
										      // 获取第一个Sheet
										const sheetName = workbook.SheetNames[0];
										console.log('sheetName:', sheetName);
										
										// 获取第2个Sheet
										const sheetName2 = workbook.SheetNames[1];
										console.log('sheetName2:', sheetName2);
										
										
										const sheet = workbook.Sheets[sheetName];
										
										const sheet2 = workbook.Sheets[sheetName2];
										
										      // 将Sheet转换为JSON格式的数据
										const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
										
										console.log('解析后的JSON数据:', jsonData);
										
										const jsonData2 = XLSX.utils.sheet_to_json(sheet2, { raw: false });
										
										console.log('解析后的JSON数据:', jsonData2);
										
										jsonData.forEach((item, index) => {
										    console.log(`索引 ${index}:`);
											let str_key = [];
											let str_val = [];
										    Object.entries(item).forEach(([key, value]) => {
										        console.log(`  ${key}: ${value}`);
												str_key.push(key);
												str_val.push(value);
										    });
											console.log("str_key", str_key);
											console.log("str_val", str_val);
											const quotedArray = str_val.map(item => `'${item}'`);
											let str = str_key.join(',');
											let quotedArrayval = quotedArray.join(',');
											str = str.replace(/"/g, '');
											console.log("str", str);
											console.log("quotedArrayval", quotedArrayval);
													// 插入初始数据
											const inDBTable = "task";
											const inData = quotedArrayval;
											const inCondition = str;
											DB.insertTableData(inDBTable, inData, inCondition).then((res) => {
													console.log("初始task插入成功", res);
													//resolve(res);
											}).catch((err) => {
													console.error("初始化task失败", err);
													//reject(err);
											});
										});
										const dbTablesql = "task";
										//const lname = "'projectname'";
										DB.selectTableData(dbTablesql).then((res) => {
										  console.log('res',res);			
										  }).catch((err) => {
										  console.error("查询task失败", err);
										  this.$mHelper.toast("查询task失败");
										  this.btnLoading = false;
										});
										
										jsonData2.forEach((item, index) => {
										    console.log(`索引 ${index}:`);
											let str_key = [];
											let str_val = [];
										    Object.entries(item).forEach(([key, value]) => {
										        console.log(`  ${key}: ${value}`);
												str_key.push(key);
												str_val.push(value);
										    });
											console.log("str_key", str_key);
											console.log("str_val", str_val);
											const quotedArray = str_val.map(item => `'${item}'`);
											let str = str_key.join(',');
											let quotedArrayval = quotedArray.join(',');
											str = str.replace(/"/g, '');
											console.log("str", str);
											console.log("quotedArrayval", quotedArrayval);
													// 插入初始数据
											const inDBTable = "task_item";
											const inData = quotedArrayval;
											const inCondition = str;
											DB.insertTableData(inDBTable, inData, inCondition).then((res) => {
													console.log("初始task_item插入成功", res);
													//resolve(res);
											}).catch((err) => {
													console.error("初始化task_item失败", err);
													//reject(err);
											});
										});
										const dbTablesql2 = "task_item";
										//const lname = "'projectname'";
										DB.selectTableData(dbTablesql2).then((res) => {
										  console.log('res',res);			
										  }).catch((err) => {
										  console.error("查询task_item失败", err);
										  this.$mHelper.toast("查询task_item失败");
										  this.btnLoading = false;
										});
										
								    };
								    fileReader.onerror = (error) => {
								      console.error('读取文件失败:', error);
								    };
									fileReader.readAsDataURL(file);
									//fileReader.readAsBinaryString(file);
								    fileReader.readAsArrayBuffer(fisavedFilePath, 'binary');
								  }, (error) => {
								    console.error('获取文件失败:', error);
								  });
								}, (error) => {
								  console.error('解析文件路径失败:', error);
								});
				            }
				        });
				
				
				
			// // 创建 user 表
			// const dbTable = "test";
			// const data = "'id' INTEGER PRIMARY KEY AUTOINCREMENT, 'projectname' TEXT, 'secondprojname' TEXT";
			// DB.createTable(dbTable, data).then(() => {
			// 		console.log('表 ${dbTable} 创建成功'); 
			  
			// 		// 插入初始数据
			// 		const inDBTable = "test";
			// 		const inData = "'test1', 'TEST1'";
			// 		const inCondition = "projectname, secondprojname";
			// 		return DB.insertTableData(inDBTable, inData, inCondition);
			// }).then((res) => {
			// 		console.log("初始用户数据插入成功", res);
			// 		//resolve(res);
			// }).catch((err) => {
			// 		console.error("初始化用户表失败", err);
			// 		//reject(err);
			// });
			// const dbTablesql = "test";
			// const lname = "'projectname'";
			// DB.selectTableData(dbTablesql).then((res) => {
			//   console.log('res',res);			
			//   }).catch((err) => {
			//   console.error("查询用户信息失败", err);
			//   this.$mHelper.toast("查询用户信息失败");
			//   this.btnLoading = false;
			// });
			});
	
			this.showImportText = true;
			this.progress = 0; // 重置进度条
			uni.showToast({
				title: '导入中...',
				icon: 'none',
				duration: 3000 // 显示3秒
			});
			//this.importExcel();
			// 使用 setInterval 模拟进度条的动态效果
			this.progressInterval = setInterval(() => {
				if (this.progress < 100) {
					this.progress += 10; // 每次增加10%
				} else {
					clearInterval(this.progressInterval); // 清除定时器
					this.updateTime = this.formatDate(new Date()); // 更新为新的时间或状态
					this.showImportText = false;
					uni.showToast({
						title: '导入完成',
						icon: 'success'
					});
				}
			}, 300); // 每300毫秒更新一次
		},
		formatDate(date) {
			const options = {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			};
			return date.toLocaleDateString('zh-CN', options).replace(/\//g, '.');
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