/**
 *@des 登录注册相关接口
 *@author wes 836790625@qq.com
 *@date 2021/01/01
 */

const loginByUsername = '/auth/oauth2/token';
const refreshToken = '/auth/oauth/token';
const loginByMobile = '/auth/mobile/token/sms';
const loginBySocial = '/auth/mobile/token/social';
const getUserInfo = '/admin/user/info';
const logout = '/auth/token/logout';

export {
	loginByUsername, refreshToken, loginByMobile, loginBySocial, getUserInfo, logout
};
