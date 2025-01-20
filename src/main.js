import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import * as Pinia from 'pinia';
// pinia数据持久化
import {
	createUnistorage
} from 'pinia-plugin-unistorage'
import vant from "vant";
import 'vant/lib/index.css';

// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js';
import $mConfig from '@/config/index.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mFormRule from '@/config/formRule.config.js';
import $mConstDataConfig from '@/config/constData.config.js';
import $mSettingConfig from '@/config/setting.config.js';
// 引入全局方法
import Request from '@/utils/request';
import $mGraceChecker from '@/utils/graceChecker';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';
import {
	usePageStore
} from "@/pinia/index";
import util from "@/utils/util.js";
import {
	enumMapConvert,
	enumConvert,
	enumsConvert,
	enumColorConvert,
	enumIconConvert
} from '@/utils/enum.js'
// 全局组件
import OaImage from '@/components/oa-image/oa-image';
import rfEmpty from '@/components/oa-empty';
import rfLoading from '@/components/oa-loading';
import rfLoadProgress from '@/components/oa-load-progress/oa-load-progress';
import rfParser from '@/components/oa-parser';
import rfBackTop from '@/components/oa-back-top';
import rfTag from '@/components/oa-tag';
import rfNavDetail from '@/components/oa-nav-detail';
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";


export function createApp() {
	const app = createSSRApp(App);
	const store = Pinia.createPinia();
	store.use(createUnistorage());
	app.use(store);
	app.use(vant)
	app.config.globalProperties.$mConstDataConfig = $mConstDataConfig
	app.config.globalProperties.$mAssetsPath = $mAssetsPath
	app.config.globalProperties.$mConfig = $mConfig
	app.config.globalProperties.$mRoutesConfig = $mRoutesConfig
	app.config.globalProperties.$mFormRule = $mFormRule
	app.config.globalProperties.$mSettingConfig = $mSettingConfig
	app.config.globalProperties.http = Request
	app.config.globalProperties.$mGraceChecker = $mGraceChecker
	app.config.globalProperties.$mHelper = $mHelper
	app.config.globalProperties.$mRouter = $mRouter
	app.config.globalProperties.pageStore = usePageStore()
	app.config.globalProperties.strToHump = util.strToHump
	app.config.globalProperties.strToHumpFirstCap = util.strToHumpFirstCap
	app.config.globalProperties.strToUnderline = util.strToUnderline
	app.config.globalProperties.formatTime = util.formatTime
	app.config.globalProperties.getServerFilePath = util.getServerFilePath
	app.config.globalProperties.getServerFileName = util.getServerFileName
	app.config.globalProperties.isPhone = util.isPhone
	app.config.globalProperties.isNum = util.isNum
	app.config.globalProperties.isRightName = util.isRightName
	app.config.globalProperties.vaildData = util.vaildData
	app.config.globalProperties.enumMapConvert = enumMapConvert
	app.config.globalProperties.enumConvert = enumConvert
	app.config.globalProperties.enumsConvert = enumsConvert
	app.config.globalProperties.enumColorConvert = enumColorConvert
	app.config.globalProperties.enumIconConvert = enumIconConvert
	app.config.globalProperties.cloneObject = object => {
		return JSON.parse(JSON.stringify(object));
	};
	app.component('OaImage', OaImage);
	app.component('rfEmpty', rfEmpty);
	app.component('rfLoading', rfLoading);
	app.component('rfLoadProgress', rfLoadProgress);
	app.component('rfParser', rfParser);
	app.component('rfBackTop', rfBackTop);
	app.component('rfTag', rfTag);
	app.component('rfNavDetail', rfNavDetail);
	app.component('uni-nav-bar', uniNavBar);

	// 网络状态监听
	uni.getNetworkType({
		success: res => {
			usePageStore().setNetworkState(res.networkType);
		}
	});
	uni.onNetworkStatusChange(function (res) {
		usePageStore().setNetworkState(res.networkType);
	});

	// 路由导航
	$mRouter.beforeEach((navType, to) => {
		if (to.route === undefined) {
			throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
		}
		if (to.route === $mRoutesConfig.login.path && usePageStore().hasLogin) {
			uni.reLaunch({
				url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
			});
			return;
		}
		// 过滤需要权限的页面
		if (to.route.requiresAuth) {
			if (usePageStore().hasLogin) {
				// 已经登录
				uni[navType]({
					url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
				});
			} else {
				// 登录成功后的重定向地址和参数
				const query = {
					redirectUrl: to.route.path,
					...to.query
				};
				// 没有登录 是否强制登录?
				if (store.state.forcedLogin) {
					uni.redirectTo({
						url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
					});
				} else {
					uni.navigateTo({
						url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
					});
				}
			}
		} else {
			uni[navType]({
				url: $mHelper.objParseUrlAndParam(to.route, to.query)
			});
		}
	});



	return {
		app,
		Pinia
	};
}