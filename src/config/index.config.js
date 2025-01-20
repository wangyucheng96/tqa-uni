const CONFIG = {
    // 开发环境配置
    development: {
        assetsPath: '/static', // 静态资源路径
        // baseUrl: 'http://192.168.10.202:9999', // 后台接口请求地址
		baseUrl: 'http://192.168.10.202:9999',
        hostUrl: 'http://192.168.10.202:9999', // H5地址(前端运行地址) https://go.bjbari.com
        weixinAppId: 'wx29c40f1dbabb7e6a' ,// 微信公众号appid
		version: '3.6',
    },
	//'http://192.168.10.202:49999'
    // 生产环境配置
    production: {
        assetsPath: '/static', // 静态资源路径
        baseUrl: 'http://192.168.10.202:9999', // 后台接口请求地址
        hostUrl: 'http://192.168.10.202:9999', // H5地址(前端运行地址)
        weixinAppId: 'wx29c40f1dbabb7e6a', // 微信公众号appid
		version: '3.6',
    }
};

export default CONFIG[process.env.NODE_ENV];
