<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + pageStore.$state.themeColor.name">
			<image class="bg" :src="userBg"></image>
			<view class="portrait-box" @tap="uploadImage">
				<!-- :src="profileInfo.avatar ? (url + profileInfo.avatar) : headImg" -->
				<image class="portrait" :src="headImg"></image>
			</view>
		</view>
		<view class="input-content">
			<!-- <view class="input-item">
				<text class="tit">用户名</text>
				<input type="text" v-model="profileInfo.username" disabled placeholder="请输入您的用户名" />
			</view> -->
			<view class="input-item">
				<text class="tit"><text style="color:red">*</text>原密码</text>
				<input v-model="formData.password" type="password" placeholder="请输入原密码" />
			</view>
			<view class="input-item">
				<text class="tit"><text style="color:red">*</text>新密码</text>
				<input v-model="formData.newpassword1" type="password" placeholder="请输入新密码" />
			</view>
			<view class="input-item">
				<text class="tit"><text style="color:red">*</text>确认密码</text>
				<input v-model="formData.newpassword2" type="password" placeholder="请确认密码" />
			</view>
			<button class="confirm-btn" :class="'bg-' + pageStore.$state.themeColor.name" :disabled="btnLoading" :loading="btnLoading"
				@tap="formCheck">
				提交
			</button>
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
				formData: {
					password: "",
					newpassword1: "",
					newpassword2: ""
				},
				loading: true,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				url: this.$mAssetsPath.url,
				btnLoading: false
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
			async initData() {
				let userInfo = uni.getStorageSync('userinfo');
				console.log(userInfo)
				this.profileInfo = userInfo
				this.loading = false;
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
    formCheck() {
      const cheRes = this.$mGraceChecker.check(
        this.formData,
        this.$mFormRule.pwdEdit
      );
      if (!cheRes) {
        this.$mHelper.toast(this.$mGraceChecker.error);
        return;
      }
      this.onSubmit(this.formData);
    },
    onSubmit(values) {
      values.avatar = this.profileInfo.avatar;
      values.username = this.profileInfo.username;
      values.phone = this.profileInfo.phone;
      const reg = /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^a-zA-Z0-9]).{8,30}$/;
      if (!reg.test(values.newpassword1)) {
        this.$mHelper.toast("最少8位 密码应包含大小写字母,数字,特殊字符");
		    return false;
      }
      if (values.newpassword1 !== values.newpassword2) {
        this.$mHelper.toast("两次输入密码不一致!");
        return false;
      }
      request({
						url: config.baseUrl + "/admin/user/edit",
						method: "put",
						data: values
					})
					.then(response => {
						if (response.data.data) {
							this.$mHelper.toast("修改成功,请重新登录");
							setTimeout(() => {
								this.toLogout();
							}, 1000)
						} else {
							this.$mHelper.toast(response.data.msg || "修改失败");
						}
					})
					.catch(() => {
						this.$mHelper.toast("修改失败");
					});
			},
			toLogout() {
				request({
					url: config.baseUrl + "/auth/token/logout",
					method: 'DELETE',
				}).then(res => {
					let temp = res.data.code;
					if (temp === 0) {
						this.$mRouter.push({
							route: '/pages/public/login'
						});
					}
				});
			}
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