<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + pageStore.$state.themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--#ifdef H5-->
			<!--h5直接上传头像-->
			<!-- @tap="uploadImage" -->
			<view class="portrait-box">
				<image class="portrait" :src="avaUrl ? avaUrl : headImg"></image>
			</view>
			<!-- #endif -->
			<!--#ifndef H5-->
			<!--非h5裁剪头像上传-->
			<!-- <view class="portrait-box">
				<avatar canRotate="false" selWidth="200px" selHeight="400upx" @upload="handleUploadFile"
					:avatarSrc="profileInfo.avatar ? (url + profileInfo.avatar) : headImg"
					avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;">
				</avatar>
			</view> -->
			<!-- #endif -->
		</view>
		<view class="input-content">
			<view class="input-item" v-for="(item, index) in label" :key="index">
				<text class="tit">{{item.label}}</text>
				{{userInfo[item.value]}}
				<!-- <input type="text" v-model="profileInfo.username" disabled placeholder="请输入您的用户名" /> -->
			</view>
			<!-- <view class="input-item">
				<text class="tit"><text style="color:red">*</text>原密码</text>
				<input v-model="profileInfo.password" type="password" placeholder="请输入原密码"/>
			</view>
			<view class="input-item">
				<text class="tit">新密码</text>
				<input v-model="profileInfo.newpassword1" type="password" placeholder="请输入新密码" />
			</view>
			<view class="input-item">
				<text class="tit">确认密码</text>
				<input v-model="profileInfo.newpassword2" type="password" placeholder="请确认密码" />
			</view> -->
			<!-- <button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading" @tap="toUpdateInfo">
				修改资料
			</button> -->
		</view>

	</view>
</template>

<script>
	import avatar from '@/components/oa-avatar/oa-avatar';
	// import {
	// 	editInfo
	// } from "@/api/admin/user";
	import {
		request
	} from '@/utils/request/request2';
	import config from '@/config/index.config';

	export default {
		components: {
			avatar
		},
		data() {
			return {
				profileInfo: {},
				loading: true,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				url: this.$mAssetsPath.url,
				btnLoading: false,
				userInfo: "",
				avaUrl: "",
				label: [{
						label: "姓名",
						value: "employeeName",
						icon: "cluster-o"
					},
					{
						label: "部门",
						value: "department",
						icon: "cluster-o"
					},
					{
						label: "岗位",
						value: "jobTitle",
						icon: "user-circle-o"
					},
					{
						label: "职务",
						value: "relativeType",
						icon: "manager-o"
					},
					{
						label: "性别",
						value: "gender",
						icon: "flower-o"
					},
					{
						label: "出生年月",
						value: "age",
						icon: "birthday-cake-o"
					},
					{
						label: "手机",
						value: "mobile",
						icon: "volume-o"
					},
					{
						label: "邮箱",
						value: "email",
						icon: "envelop-o"
					}
				],
			};
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.pageStore.$state.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		onLoad() {
			this.initData();
		},
		methods: {
			// 数据初始化
			initData() {
				let userInfo = uni.getStorageSync('userinfo');
				// this.profileInfo = userInfo
				// this.loading = false;
				if (userInfo.avatar) {
					this.avaUrl = this.getServerFilePath(userInfo.avatar);
				}
				this.getUserInfo();
			},
			// 上传头像
			uploadImage() {
				// 从相册选择图片
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths);
					}
				});
			},
			// 上传头像
			handleUploadFile(data) {
				const _this = this;
				const filePath = data.path || data[0];
				_this.$http
					.upload('/admin/sys-file/upload', {
						filePath,
						name: 'file'
					})
					.then(r => {
						_this.profileInfo.avatar = r.data.url;
					});
			},
			// 更新用户信息
			async toUpdateInfo() {
				if (!this.profileInfo.password) return this.$mHelper.toast('原密码不能为空');
				this.$http.put(editInfo, this.profileInfo).then(res => {
					this.$mHelper.toast('恭喜您, 资料修改成功!');
				})
			},
			getUserInfo() {
				let userinfo = uni.getStorageSync('userinfo');
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $color-white;
	}

	.userinfo {
		.user-section {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 320upx;
			padding: 40upx 30upx 0;
			overflow: hidden;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				opacity: 0.84;
			}

			.portrait-box {
				clear: both;
				z-index: 3;
			}

			.portrait {
				position: relative;
				width: 200upx;
				height: 200upx;
				border-radius: 50%;
				border: 6upx solid #fff;
			}

			.yticon {
				position: absolute;
				line-height: 1;
				z-index: 5;
				font-size: 48upx;
				color: #fff;
				padding: 4upx 6upx;
				border-radius: 6upx;
				background: rgba(0, 0, 0, 0.4);
			}

			.pt-upload-btn {
				right: 0;
				bottom: 10upx;
			}

			.bg-upload-btn {
				right: 20upx;
				bottom: 16upx;
			}
		}

		.input-content {
			padding: 40upx 60upx;

			.input-item {
				display: flex;
				padding: 0 30upx;
				background: $page-color-light;
				height: 80upx;
				line-height: 80upx;
				border-radius: 4px;
				margin-bottom: 30upx;

				&:last-child {
					margin-bottom: 0;
				}

				.tit {
					width: 130upx;
					font-size: $font-sm + 2upx;
					color: $font-color-base;
				}

				input {
					width: calc(100% - 100upx);
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}

			}
		}
	}
</style>