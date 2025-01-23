<template>
	<view class="container">
		<view class="historyImport-wrapper">
			<view class="historyImport">
				历史同步信息
			</view>
		</view>
		<view class="equipment-wrapper">
			<view class="equipment">
				设备已连接
			</view>
		</view>
		<view class="import-btn-wrapper">
			<button class="import-btn" type="primary" @click="handleImport">
				立即同步
			</button>
		</view>
		<view class="info-text">
			<view class="updateText">数据更新时间为：
				<span class="updateTime">{{ updateTime }}</span>
			</view>
		</view>
		<view class="progressBar" v-if="showImportText">
			<view class="isUpdate">正在同步</view>
			<piaoyiProgressBar :progress="progress" backgroundColor="#EFEFF4" progressBackgroundColor="#07C160"
				:showText="true" textColor="#fff" :textSize="24" :height="50"></piaoyiProgressBar>
		</view>
	</view>
</template>

<script>
	import DB from "@/utils/sqlite/sqlite.js";
	import * as XLSX from 'xlsx';
	import piaoyiProgressBar from '@/uni_modules/piaoyi-progress-bar/components/piaoyi-progress-bar/piaoyi-progress-bar.vue';

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
				excelBuffer: ""
			};
		},
		methods: {
			handleImport() {
				this.showImportText = true;
				this.progress = 0; // 重置进度条
				const dbTablesql2 = "task_item";
				//const lname = "'projectname'";
				DB.selectTableData(dbTablesql2).then((res) => {
					console.log('res', res);

					// 使用 SheetJS 将 JSON 数据转换为 Excel 文件
					//const XLSX = require('xlsx');
					const jsonData = [
					          { name: "张三", age: 25, gender: "男" },
					          { name: "李四", age: 30, gender: "女" }
					        ];
					const worksheet = XLSX.utils.json_to_sheet(res); // 将 JSON 数据转换为工作表
					console.log('worksheet', worksheet);
					const workbook = XLSX.utils.book_new(); // 创建工作簿
					console.log('workbook', workbook);
					XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // 添加工作表到工作簿

					// 将工作簿转换为二进制字符串
					
					this.excelBuffer = XLSX.write(workbook, {
						type: 'base64',
						bookType: 'xlsx'
					});
					//console.log('excelBuffer', excelBuffer);
					//console.log('excelBuffer',excelBuffer);
					// 将二进制字符串转换为 Base64 格式
					//const base64String = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelBuffer}`;
					//console.log('base64String',base64String);
					// /storage/emulated/0/Download/WeiXin/tasktest0122.xlsx
					// 使用 uni.downloadFile 模拟下载文件
					//const tempFilePath = 'file:///storage/emulated/0/Download/WeiXin/task_items.xlsx';
					// 将 Base64 字符串转换为 ArrayBuffer
					//const arrayBuffer = this.base64ToArrayBuffer(excelBuffer);

						
					// 写入文件
					//const filePath = `${plus.io.PUBLIC_DOCUMENTS}/exported_data.xlsx`; // 保存到公共文档目录
					//const filePath = 'file:///storage/emulated/0/Download/WeiXin/task_items.xlsx';
					
					//this.writeFile(filePath, arrayBuffer);
					//const base64Data = excelBuffer.split(",")[1];
					// return new Promise((resolve, reject) => {
					// plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
					//           const root = fs.root;
					//           const filePath = `${root.toURL()}/${'task_items.xlsx'}`;
					// 		  console.log('filePath', filePath);
					
					//           root.getFile('task_items.xlsx', { create: true }, (fileEntry) => {
					//             fileEntry.createWriter((writer) => {
					//               writer.onwriteend = () => {
					//                 resolve(filePath); // 返回文件路径
					//               };
					//               writer.onerror = (err) => {
					//                 console.error("写入文件失败：", err);
					//                 reject(err);
					//               };
					
					//               // 使用 Android 原生 Base64 类解码
					//               const Base64 = plus.android.importClass("android.util.Base64");
					// 			  console.log("Base64：", Base64);
					//               const bytes = Base64.decode(excelBuffer, Base64.DEFAULT);
					// 			  console.log("bytes：", bytes);
					//               // 写入二进制数据
					//               writer.write(new Uint8Array(bytes));
					// 			  //writer.write(base64String);
					// 			  // 确保写入完成后关闭 writer
					// 			        writer.onwriteend = () => {
					// 			          writer.close(); // 关闭 writer
					// 			          console.log('文件写入完成，已关闭 writer');
					// 			        };
					//             });
					//           });
					//         });
					// 		});
                     
                         // 示例 Base64 字符串（Excel 文件的 Base64 编码）
                         //this.base64String = "your_base64_string_here"; // 替换为你的 Base64 字符串
                 
                         // 调用方法将 Base64 字符串保存为 Excel 文件
                         const filePath = this.base64ToFile(this.excelBuffer, "exported_data.xlsx");
						 console.log("filePath", filePath);

				}).catch((err) => {
					console.error("查询task_item失败", err);
					this.$mHelper.toast("查询task_item失败");
					this.btnLoading = false;
				});


				uni.showToast({
					title: '同步中...',
					icon: 'none',
					duration: 3000 // 显示3秒
				});

				// 使用 setInterval 模拟进度条的动态效果
				this.progressInterval = setInterval(() => {
					if (this.progress < 100) {
						this.progress += 10; // 每次增加10%
					} else {
						clearInterval(this.progressInterval); // 清除定时器
						this.updateTime = new Date().toLocaleString(); // 更新为新的时间或状态
						this.showImportText = false;
						uni.showToast({
							title: '同步完成',
							icon: 'success'
						});
					}
				}, 300); // 每300毫秒更新一次
			},
			    base64ToFile(base64String, fileName) {
			      return new Promise((resolve, reject) => {
			        // 去除 Base64 前缀（如果存在）
			        //const base64Data = base64String.split(",")[1];
					 const base64Data = base64String;
			
			        plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
			          const root = fs.root;
			          const filePath = `${root.toURL()}/${fileName}`;
			
			          root.getFile(fileName, { create: true }, (fileEntry) => {
			            //fileEntry.createWriter((writer) => {
			              // writer.onwriteend = () => {
			              //   resolve(filePath); // 返回文件路径
			              // };
			              // writer.onerror = (err) => {
			              //   console.error("写入文件失败：", err);
			              //   reject(err);
			              // };
			
			              // 使用 Android 原生 Base64 类解码
						  var fullPath = fileEntry.fullPath; 
			              const Base64 = plus.android.importClass("android.util.Base64");
						  var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
						  var out = new FileOutputStream(fullPath);  
			              const bytes = Base64.decode(base64Data, 0);//Base64.DEFAULT
			
			              // 写入二进制数据
						  out.write(bytes); // byte 数组写入此文件输出流中。  
						  out.flush(); //刷新写入文件中去。  
						  out.close(); //关闭此文件输出流并释放与此流有关的所有系统资源。  
						  const content = new Uint8Array(bytes)
						  //console.log("content：",content);
			              //writer.write(content);
			            //});
			          });
			        });
			      });
			    },
			base64ToArrayBuffer(base64) {
				const binaryString = atob(base64); // 将 Base64 解码为二进制字符串
				const len = binaryString.length;
				const bytes = new Uint8Array(len);
				for (let i = 0; i < len; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				return bytes.buffer;
			},
			writeFile(filePath, content) {
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
					console.log('plus.io.PRIVATE_DOC', plus.io.PRIVATE_DOC);
					fs.root.getFile(filePath, {
						create: true
					}, (fileEntry) => {
						fileEntry.createWriter((writer) => {
							writer.onwriteend = () => {
								uni.showToast({
									title: '文件导出成功',
									icon: 'success'
								});
							};
							writer.onerror = (err) => {
								console.error('写入文件失败：', err);
								uni.showToast({
									title: '文件导出失败',
									icon: 'none'
								});
							};
							writer.write(content); // 写入二进制数据
						});
					});
				});
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