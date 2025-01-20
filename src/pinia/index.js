import {
	defineStore
} from 'pinia'
import $mConstDataConfig from '@/config/constData.config.js';

export const usePageStore = defineStore('page', {
	state: () => ({
		// 用户token
		accessToken: uni.getStorageSync('accessToken') || '',
		// 用户信息
		userInfo: uni.getStorageSync('user').member || {},
		// 推荐人
		referrer: uni.getStorageSync('referrer') || '',
		// 小程序openid
		openId: '',
		// 网络状态，用于下载提醒
		networkState: 'unknown',
		globalConfig: uni.getStorageSync('globalConfig') || {},
		refreshToken: uni.getStorageSync('refreshToken') || '',
		// 购物车数字角标
		cartNum: uni.getStorageSync('cartNum') || 0,
		// 消息中心数字角标
		notifyNum: uni.getStorageSync('notifyNum') || 0,
		// 历史聊天消息，仅保存最后100条
		imHistory: uni.getStorageSync('imHistory') || [],
		// 当前未读聊天消息数量
		imNoRead: uni.getStorageSync('imNoRead') || 0,
		// 当前是否处于聊天面板
		isImPanel: false,
		// 当前是否人工客服服务
		isStuffService: false,
		themeColor: uni.getStorageSync('themeColor') || {
			title: '海蓝',
			name: 'blue',
			color: '#0081ff',
		},
		// 首页-常用模块
		commonModules: uni.getStorageSync('commonModules') || [],
		// 用户权限
		permissions: uni.getStorageSync('permissions') || {},
	}),
	getters: {
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
		// 判断用户是否登录
		hasLogin: state => {
			return !!state.accessToken;
		},

	},
	actions: {
		login(provider) {
			this.accessToken = provider.access_token;
			this.refreshToken = provider.refresh_token;
			this.userInfo = provider.user_info;
			this.user = provider;
			uni.setStorageSync('user', provider);
			uni.setStorageSync('accessToken', provider.access_token);
			uni.setStorageSync('refreshToken', provider.refresh_token);
			uni.setStorageSync('userInfo', provider.user_info);
		},

		setReferrer(referrer) {
			this.referrer = referrer;
			uni.setStorageSync('referrer', referrer);
		},
		setOpenId(openId) {
			this.openId = openId;
			uni.setStorageSync('openId', openId);
		},

		setCartNum(provider) {
			this.cartNum = provider;
			uni.setStorageSync('cartNum', provider);
			if (!provider || parseInt(provider, 10) === 0) {
				uni.removeTabBarBadge({
					index: $mConstDataConfig.cartIndex
				});
			} else {
				uni.setTabBarBadge({
					index: $mConstDataConfig.cartIndex,
					text: provider.toString()
				});
			}
		},
		setNotifyNum(provider) {
			this.notifyNum = provider;
			uni.setStorageSync('notifyNum', provider);
			if (parseInt(provider, 10) === 0) {
				uni.removeTabBarBadge({
					index: $mConstDataConfig.notifyIndex
				});
			} else {
				uni.setTabBarBadge({
					index: $mConstDataConfig.notifyIndex,
					text: provider.toString()
				});
			}
		},

		addImHistory(provider) {
			if (provider) {
				let data = this.imHistory;
				data.push(provider);
				uni.setStorageSync('imHistory', data);
				this.imHistory = data;
				if (!state.isImPanel) {
					this.commit('addImNoRead', 1);
				}
			}
		},
		clearImHistory() {
			this.imHistory = [];
			uni.setStorageSync('imHistory', []);
			this.imNoRead = 0;
			uni.setStorageSync('imNoRead', 0);
		},
		addImNoRead(provider) {
			this.imNoRead = this.imNoRead + provider;
			uni.setStorageSync('imNoRead', state.imNoRead);
		},
		setIsImPanel(provider) {
			this.isImPanel = provider;
			if (provider) {
				this.imNoRead = 0;
				uni.setStorageSync('imNoRead', 0);
			}
		},
		setIsStuffService(provider) {
			this.isStuffService = provider;
		},
		setThemeColor(val) {
			this.themeColor = val;
			uni.setStorageSync('themeColor', val);
		},
		setCommonModules(provider) {
			this.commonModules = provider;
			uni.setStorageSync('commonModules', provider);
		},
		setPermissions(permissions) {
			const list = {}
			for (let i = 0; i < permissions.length; i++) {
				list[permissions[i]] = true
			}
			this.permissions = list
			uni.setStorageSync('permissions', list);
		},
		setGlobalConfig(provider) {
			this.globalConfig = provider;
			uni.setStorageSync('globalConfig', provider);
		},
		setNetworkState(provider) {
			this.networkState = provider;
		},
		logout() {
			this.accessToken = '';
			this.refreshToken = '';
			this.userInfo = {};
			uni.removeStorageSync('accessToken');
			uni.removeTabBarBadge({
				index: $mConstDataConfig.notifyIndex
			});
			uni.removeTabBarBadge({
				index: $mConstDataConfig.cartIndex
			});
			uni.removeStorageSync('refreshToken');
			uni.removeStorageSync('userInfo');
		},
	}
});