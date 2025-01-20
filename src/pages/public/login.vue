<template>
  <view class="login">
    <view class="container">
      <!--顶部返回按钮-->
      <text class="back-btn iconfont iconzuo" @tap="navBack"></text>
      <!--插画-->
      <view class="right-top-sign"></view>
      <view class="register-text" @tap="navTo('/pages/public/register')">
        注册
      </view>
      <view class="wrapper">
        <view class="left-top-sign">火箭公司质量采集</view>
        <view class="welcome"> 登录！ </view>
        <view class="input-content">
          <view class="uni-padding-wrap uni-common-mt">
            <uni-segmented-control
              :current="current"
              :values="items"
              :style-type="styleType"
              :active-color="activeColor"
              @clickItem="onClickItem"
            />
          </view>
          <view class="input-item">
            <text class="tit">用户名</text>
            <input
              name="username"
              placeholder="请输入用户名"
              v-model="model.username"
            />
          </view>
          <view class="input-item">
            <text class="tit">密码</text>
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              v-model="model.password"
            />
          </view>
          <view class="">
            <checkbox-group @change="changeRememberPsw">
              <label style="display: flex; align-items: center">
                <view>
                  <checkbox value="psw" :checked="rememberPsw" />
                </view>
                <view style="margin-left: 8px">记住账号密码</view>
              </label>
            </checkbox-group>
          </view>
          <button
            class="confirm-btn"
            :class="'bg-' + pageStore.$state.themeColor.name"
            :disabled="btnLoading"
            :loading="btnLoading"
            @tap="toLogin"
          >
            登录
          </button>
        </view>
      </view>
      <view class="register-section">
        <!-- <text @tap="navTo('/pages/public/password')">找回密码</text>
				或者 -->
        <!-- <text @tap="toHome">返回主页</text> -->
      </view>
      <view class="read-section">
        <radio-group @change="radioChange">
          <label class="radio">
            <radio value="1" style="transform: scale(0.6)" /><text
              >我已阅读并同意</text
            >
            <text class="link" @tap="goAgreement()">用户协议</text
            ><text>与</text
            ><text class="link" @tap="goPrivacy()">隐私政策</text>
          </label>
        </radio-group>
      </view>
    </view>
  </view>
</template>
<script>
import config from "@/config/index.config";
import { request } from "@/utils/request/request2";
import { loginByUsername, getUserInfo } from "@/api/login";
// import { getValueByKey, getMultiValueByKeys } from "@/api/sys-public-param";
import * as CryptoJS from "crypto-js";
import DB from "@/utils/sqlite/sqlite.js";

export default {
  data() {
    return {
      smsCodeBtnDisabled: false,
      codeSeconds: 0, // 验证码发送时间间隔
      model: {},
      btnLoading: false,
      radio: "0",
      rememberPsw: false,
      appTitle: this.$mConstDataConfig.appTitle,
      shortcuts: this.$mConstDataConfig.shortcuts,
      items: ["工作人员", "产品经理", "管理员"],
      styles: [
        {
          value: "button",
          text: "按钮",
          checked: true,
        },
        {
          value: "text",
          text: "文字",
        },
      ],
      styleType: "button",
      activeColor: "#007aff",
      current: 0,
    };
  },
  onLoad() {},
  mounted() {
    console.log(111, this.pageStore.$state.themeColor);
    let user = uni.getStorageSync("loginUser");
    if (user.username && user.password) {
      this.model = {
        username: user.username,
        password: user.password,
      };
      this.rememberPsw = true;
    }
  },
  methods: {
    // 返回上一页
    navBack() {
      this.$mRouter.back();
    },
    // 统一跳转路由
    navTo(route) {
      this.$mRouter.push({
        route,
      });
    },
    // 返回主页
    toHome() {
      uni.reLaunch({
        url: "/pages/tabs/index/index",
      });
    },
    radioChange(e) {
      this.radio = e.detail.value;
    },
    changeRememberPsw(e) {
      if (e.detail.value[0] === "psw") {
        this.rememberPsw = true;
      } else {
        this.rememberPsw = false;
      }
    },
    // 提交表单
    toLogin() {
      const cheRes = this.$mGraceChecker.check(
        this.model,
        this.$mFormRule.loginByPwd
      );
      if (!cheRes) {
        this.$mHelper.toast(this.$mGraceChecker.error);
        return;
      }
      if (this.radio === "0") {
        this.$mHelper.toast("请勾选用户协议与隐私政策");
        return;
      }
      this.handleLogin(this.model);
    },
    // 登录
    handleLogin(param) {
      this.btnLoading = true;
      let pswd = param.password;
      console.log(pswd);
      if (pswd) {
        // var CryptoJS = CryptoJS;
        var key = "yunyoucloudcloud";
        key = CryptoJS.enc.Utf8.parse(key);
        var iv = key;
        var encrypted = CryptoJS.AES.encrypt(pswd, key, {
          iv: iv,
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding,
        });
        pswd = encrypted.toString();
      }
      //使用sqlite数据库
	    const username = param.username;
      const password = param.password;

      // 查询数据库中的用户信息
      const dbTable = "user";
      const lname = "username";
      const lvalue = username;
	  
	  const userInfo = {
	    username: param.username,
	    password: param.password, // 注意：通常不建议存储明文密码
	  };
	  // 使用 uni.setStorageSync 同步存储用户信息
	  uni.setStorageSync("userInfo", userInfo);
	  this.$mHelper.toast("恭喜您，登录成功！");
	  uni.setStorageSync("access_token", userInfo.username);
	  uni.setStorageSync("username", userInfo.username);
	  //记住密码
	  if (this.rememberPsw) {
	    uni.setStorageSync("loginUser", this.model);
	  } else {
	    uni.removeStorageSync("loginUser");
	  }
	  
	  this.btnLoading = false;
	  this.toHome();
	  
	  
	  return
      DB.selectTableData(dbTable, lname, lvalue).then((res) => {
        if (res.length > 0) {
          const user = res[0];
          if (user.password === password) {
            const userInfo = {
              username: user.username,
              password: user.password, // 注意：通常不建议存储明文密码
            };
            // 使用 uni.setStorageSync 同步存储用户信息
            uni.setStorageSync("userInfo", userInfo);
            this.$mHelper.toast("恭喜您，登录成功！");
            uni.setStorageSync("access_token", userInfo.username);
            uni.setStorageSync("username", userInfo.username);
            //记住密码
            if (this.rememberPsw) {
              uni.setStorageSync("loginUser", this.model);
            } else {
              uni.removeStorageSync("loginUser");
            }

            this.btnLoading = false;
            this.toHome();
          } else {
            this.$mHelper.toast("用户名不存在或者密码错误!");
            this.btnLoading = false;
          }
        } else {
          this.$mHelper.toast("用户名不存在或者密码错误!");
          this.btnLoading = false;
        }
      }).catch((err) => {
        console.error("查询用户信息失败", err);
        this.$mHelper.toast("查询用户信息失败");
        this.btnLoading = false;
      });

      return
	    // 使用 uni.setStorageSync 同步存储用户信息
	    uni.setStorageSync("userInfo", userInfo);
	    this.$mHelper.toast("恭喜您，登录成功！");
	    uni.setStorageSync("access_token", userInfo.username);
	    uni.setStorageSync("username", userInfo.username);
	    //记住密码
	    if (this.rememberPsw) {
	      uni.setStorageSync("loginUser", this.model);
	    } else {
	      uni.removeStorageSync("loginUser");
	    }
	    
	    this.btnLoading = false;
	    this.toHome();
	  
	  return;
	  
      request({
        url: config.baseUrl + loginByUsername,
        isToken: true,
        method: "post",
        params: {
          username: param.username,
          app_type: "app",
          grant_type: "password",
          scope: "server",
        },
        data: {
          password: pswd,
        },
      })
        .then((res) => {
          this.$mHelper.toast("恭喜您，登录成功！");
          this.pageStore.login(res);
          uni.setStorageSync("access_token", res.data.access_token);
          uni.setStorageSync("username", res.data.username);
          //记住密码
          if (this.rememberPsw) {
            uni.setStorageSync("loginUser", this.model);
          } else {
            uni.removeStorageSync("loginUser");
          }

          this.btnLoading = false;
          this.getUserInfo();
          this.getValue();
          // this.$mRouter.back();
          // this.$mRouter.redirectTo({
          // 	route: '/pages/tabs/profile/index'
          // });
          setTimeout(() => {
            this.toHome();
          }, 1000);
        })
        .catch((err) => {
          this.btnLoading = false;
          if (err.statusCode === 426) {
            this.$mHelper.toast("用户名不存在或者密码错误" || "登录失败");
          } else {
            this.$mHelper.toast(err.data.msg);
          }
        });
      // this.$http.post(
      // 		loginByUsername,
      // 		{
      // 			grant_type: 'password',
      // 			username: params.username,
      // 			password: params.password,
      // 			scope: 'server'
      // 		},
      // 		{
      // 			params: {app_type: 'app'},
      // 			header: {
      // 				'Authorization': 'Basic dGVzdDp0ZXN0',
      // 				'Content-Type': 'application/x-www-form-urlencoded',
      // 				'TENANT_ID': 1
      // 			}
      // 		})
      // 	.then(r => {
      // 		this.$mHelper.toast('恭喜您，登录成功！');
      // 		this.pageStore.login(res);
      // 		this.btnLoading = false;
      // 		this.$mRouter.reLaunch({
      // 			route: '/pages/tabs/profile/index'
      // 		});
      // 	})
      // 	.catch(() => {
      // 		this.btnLoading = false;
      // 	});
    },
    async getUserInfo() {
      request({
        url: config.baseUrl + getUserInfo,
        method: "get",
      })
        .then((res) => {
          let data = res.data.data.sysUser;
          uni.setStorageSync("userinfo", data);
          this.pageStore.setPermissions(res.data.data.permissions);
          this.initPermissionData();
        })
        .catch(() => {
          this.$mHelper.toast("获取个人信息失败");
        });
    },
    getValue() {
      
    },
    // 配置权限数据
    initPermissionData() {
      let permissions = this.pageStore.$state.permissions;
      console.log("initPermissionData=======", permissions);
      this.appTitle.map((item) => {
        this.shortcuts[item.text].map((s) => {
          if (permissions[s.product] || s.product === "all") {
            s.show = true;
          } else {
            s.show = false;
          }
        });
      });
      this.appTitle.forEach((item) => {
        let flag = false;
        this.shortcuts[item.text].forEach((s) => {
          if (s.show) {
            flag = true;
          }
        });
        item.show = flag;
      });
      let commonModules = [];
      this.appTitle = this.appTitle.filter((item) => {
        if (item.show) {
          return item;
        }
      });
      this.appTitle.map((item) => {
        this.shortcuts[item.text] = this.shortcuts[item.text].filter((s) => {
          if (s.show) {
            commonModules.push(s);
            return s;
          }
        });
      });
      commonModules.map((item) => {
        if (item.title === "待办审批") {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });

      //初始化常用模块
      if (!uni.getStorageSync("commonModules")) {
        uni.setStorageSync("commonModules", commonModules);
      }
      this.pageStore.setCommonModules(uni.getStorageSync("commonModules"));
    },
	goAgreement() {
		this.navTo('/pages/user/agreement')
	},
	goPrivacy() {
		this.navTo('/pages/user/privacy')
	}
  },
};
</script>
<style lang="scss">
page {
  background: $color-white;
}

.container {
  padding-top: 115px;
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: #fff;

  .wrapper {
    position: relative;
    z-index: 90;
    background: #fff;
    padding-bottom: 40upx;
  }

  .back-btn {
    position: absolute;
    left: 40upx;
    z-index: 9999;
    padding-top: var(--status-bar-height);
    top: 40upx;
    font-size: 40upx;
    color: $font-color-dark;
  }

  .register-text {
    position: absolute;
    right: 20px;
    top: 30px;
    color: #333;
    font-size: 15px;
    font-weight: bold;
  }

  .left-top-sign {
    font-size: 120upx;
    color: $page-color-base;
    position: relative;
    left: -16upx;
  }

  .right-top-sign {
    position: absolute;
    top: 80upx;
    right: -30upx;
    z-index: 95;

    &:before,
    &:after {
      display: block;
      content: "";
      width: 400upx;
      height: 80upx;
      background: #b4f3e2;
    }

    &:before {
      transform: rotate(50deg);
      border-radius: 0 50px 0 0;
    }

    &:after {
      position: absolute;
      right: -198upx;
      top: 0;
      transform: rotate(-50deg);
      border-radius: 50px 0 0 0;
      /* background: pink; */
    }
  }

  .left-bottom-sign {
    position: absolute;
    left: -270upx;
    bottom: -320upx;
    border: 100upx solid #d0d1fd;
    border-radius: 50%;
    padding: 180upx;
  }

  .welcome {
    position: relative;
    left: 50upx;
    top: -90upx;
    font-size: 46upx;
    color: #555;
    text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
  }

  .input-content {
    padding: 0 60upx;
  }

  .input-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 30upx;
    background: $page-color-light;
    height: 120upx;
    border-radius: 4px;
    margin-bottom: 50upx;

    &:last-child {
      margin-bottom: 0;
    }

    .tit {
      height: 50upx;
      line-height: 56upx;
      font-size: $font-sm + 2upx;
      color: $font-color-base;
    }

    input {
      height: 60upx;
      font-size: $font-base + 2upx;
      color: $font-color-dark;
      width: 100%;
    }
  }

  .input-item-sms-code {
    position: relative;
    width: 100%;

    .sms-code-btn {
      position: absolute;
      color: #111;
      right: 20upx;
      bottom: 20upx;
      font-size: 28upx;
    }

    .sms-code-resend {
      color: #999;
    }

    .sms-code-btn:after {
      border: none;
      background-color: transparent;
    }
  }

  .forget-section {
    font-size: $font-sm + 2upx;
    color: $font-color-spec;
    text-align: center;
    margin-top: 40upx;
  }

  .register-section {
    margin: 30upx 0 50upx 0;
    width: 100%;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    text-align: center;

    text {
      color: $font-color-spec;
      margin-left: 10upx;
    }

    text:first-child {
      margin-right: 10upx;
    }
  }

  .read-section {
    text-align: center;

    .link {
      margin: 0 4px;
      color: #4399fc;
      border-bottom: 1px solid #4399fc;
    }
  }

  .btn-group {
    display: flex;
    margin-bottom: 20upx;
  }
}

.login-type-2 {
  width: 100%;
  position: relative;

  .back-btn {
    position: absolute;
    left: 40upx;
    z-index: 9999;
    padding-top: var(--status-bar-height);
    top: 40upx;
    font-size: 48upx;
    color: $color-white;
  }

  .login-top {
    height: 460upx;
    position: relative;

    .desc {
      position: absolute;
      top: 200upx;
      left: 40upx;
      font-size: 48upx;

      .title {
        font-size: 48upx;
      }
    }

    .login-pic {
      position: absolute;
      width: 220upx;
      height: 270upx;
      right: 30upx;
      top: 100upx;
    }
  }

  .login-type-content {
    position: relative;
    top: -72upx;

    .login-bg {
      width: 94vw;
      height: 94vw;
      margin: 0 3vw;
    }

    .main {
      width: 94vw;
      position: absolute;
      top: 0;
      left: 3vw;

      .nav-bar {
        display: flex;
        height: 100upx;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 10;

        .nav-bar-item {
          flex: 1;
          display: flex;
          height: 100%;
          line-height: 96upx;
          font-size: $font-lg;
          display: flex;
          margin: 0 120upx;
          justify-content: center;
        }

        .nav-bar-item-active {
          border-bottom: 5upx solid;
        }
      }

      .login-type-form {
        width: 80%;
        margin: 50upx auto;

        .input-item {
          position: relative;
          height: 90upx;
          line-height: 90upx;
          margin-bottom: $spacing-lg;

          .iconfont {
            font-size: 50upx;
            position: absolute;
            left: 0;
          }

          .login-type-input {
            height: 90upx;
            padding-left: 80upx;
            border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
          }

          .sms-code-btn,
          sms-code-resend {
            width: 240upx;
            font-size: $font-base - 2upx;
          }
        }
      }

      .login-type-tips {
        padding: 0 50upx;
        display: flex;
        justify-content: space-between;
      }

      .confirm-btn {
        height: 80upx;
        line-height: 80upx;
      }
    }
  }

  .login-type-bottom {
    width: 100%;
    padding-bottom: 30upx;
    text-align: center;
    font-size: $font-lg;
  }
}
.uni-padding-wrap {
  /* // width: 750rpx; */
  padding: 0px 30px;
  padding-bottom: 20px;
}
</style>
