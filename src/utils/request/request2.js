/**
 * request 接口请求公共部分
 * @param {Object} params 请求参数
 */
import config from '@/config/index.config.js';

export const loginBasicStr = 'Basic cGlnOkFQU0AyMDE4Lnl1bnlvdWNsb3Vk';

export function request(params) {
	let contentType = 'application/x-www-form-urlencoded'
	let tokenStr = loginBasicStr
	if (params.isToken !== true) {
		contentType = 'application/json;charset=UTF-8'
		tokenStr = 'Bearer ' + uni.getStorageSync('access_token')
	}
	let respType = params.responseType
	if (!respType)
		respType = 'text'
	let urlStr = params.url
	if (params.params) {
		let findParam = false
		Object.keys(params.params).forEach(item => {
			if (params.params[item] !== undefined && params.params[item] !== null) {
				if (!findParam)
					urlStr += '?'
				else
					urlStr += '&'
				if (params.method && params.method.toUpperCase() == 'GET')
					urlStr += (encodeURIComponent(item) + '=' + params.params[item])
				else
					urlStr += (encodeURIComponent(item) + '=' + encodeURIComponent(params.params[item]))
				findParam = true
			}
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: urlStr,
			data: params.data,
			method: params.method,
			header: {
				'Content-Type': contentType,
				'TENANT-ID': '1',
				'Authorization': tokenStr,
			},
			dataType: 'json',
			responseType: respType,
			success: function(res) {
				if (res.statusCode == 200) {
					if (params.isToken === true || res.data && res.data.code == 0)
						resolve(res);
					else
						reject(res);
				} else {
					if (res.statusCode == 401 && params.isToken !== true) {
						//         this.$mRouter.push({
						// route: '/pages/public/login'
						//         });
						// uni.reLaunch({
						// 	url: '/pages/public/login'
						// })
					}
					reject(res);
				}
			},
			fail: function(res) {
				// uni.reLaunch({
				// 	url: '/pages/public/login'
				// })
				this.$mHelper.toast('网络错误')
				reject(res);
			},
			complete: function(res) {},
		})
	});
}