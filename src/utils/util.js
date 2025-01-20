/**工具库封装 */
import {
	validatenull
} from './validate';
import config from '@/config/index.config';

// 下划线转换驼峰
const strToHump = (name => {
	return name.replace(/\_(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
})
const strToHumpFirstCap = (name => {
	let hump = name.replace(/\_(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
	return hump[0].toUpperCase() + hump.substr(1)
})
// 驼峰转换下划线
const strToUnderline = (name => {
	return (name[0].toLowerCase() + name.substr(1)).replace(/([A-Z])/g, "_$1").toLowerCase();
})

const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

//获取后端文件/图片路径
const serverFilePrefix = '/admin/sys-file/';
const getServerFilePath = function (url, suffix) {
	if (url && url.indexOf('://') < 0 && url.indexOf(serverFilePrefix) < 0) {
		let text = url
		let pos = text.indexOf("@/")
		if (pos >= 0)
			text = text.substr(pos + 2)
		if (suffix) {
			let pos = text.lastIndexOf('.')
			if (pos >= 0)
				text = text.substring(0, pos) + suffix + text.substring(pos)
			else
				text = text + suffix
		}
		return config.baseUrl + serverFilePrefix + "get?path=" + encodeURIComponent(text)
	}
	return url;
};
const getServerFileName = function (url) {
	if (url) {
		if (url.indexOf('://') < 0) {
			let arr = url.split("@/")
			if (arr.length >= 2)
				return arr[0]
		}
		let pos = url.lastIndexOf('/')
		if (pos >= 0)
			return url.substring(pos + 1)
	}
	return url
};

//验证是否是纯数字
const isNum = function (str) {
	if (str) {
		var reg = new RegExp("^[0-9]*$");
		if (reg.test(str))
			return true;
		else
			return false;
	}
}

//验证是否是手机号--规则：以1开头的11位数字即可
const isPhone = function (str) {
	if (str) {
		var myreg = /^1\d{10}$/;
		if (myreg.test(str)) {
			return true;
		} else {
			return false;
		}
	}
}

//验证姓名是否合法
const isRightName = function (str) {
	if (str) {
		var myreg = /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/;
		if (myreg.test(str))
			return true;
		else
			return false;
	}

}

const vaildData = (val, dafult) => {
	if (typeof val === 'boolean') {
		return val;
	}
	return !validatenull(val) ? val : dafult;
};

export default {
	strToHump,
	strToHumpFirstCap,
	strToUnderline,
	formatTime,
	getServerFilePath,
	getServerFileName,
	isPhone,
	isNum,
	isRightName,
	vaildData
}