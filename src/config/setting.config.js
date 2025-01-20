import $mAssetsPath from './assets.config';
import $mConstData from './constData.config';
class Setting {
	constructor(
		appName,
		appLogo,
		styleLoadingIsOpen,
		styleLoadingType,
		
	) {
		this._appName = appName; // 应用名称
		this._appLogo = appLogo; // 应用Logo
		this._styleLoadingIsOpen = styleLoadingIsOpen; // 开启加载
		this._styleLoadingType = styleLoadingType; // 用户可否自定义风格

	}

	

	get appName() {
		return this._appName;
	}

	set appName(value) {
		this._appName = value;
	}

	get appLogo() {
		return this._appLogo;
	}

	set appLogo(value) {
		this._appLogo = value;
	}

	get styleLoadingIsOpen() {
		return this._styleLoadingIsOpen;
	}

	set styleLoadingIsOpen(value) {
		this._styleLoadingIsOpen = value;
	}

	get styleLoadingType() {
		return this._styleLoadingType;
	}

	set styleLoadingType(value) {
		this._styleLoadingType = value;
	}
	
}
export default new Setting(
	$mConstData.appName,
	$mAssetsPath.logo,
	// loading
	true,
	'loop',
	
);
