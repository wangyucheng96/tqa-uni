import {
	getMultiValueByKeys
} from '@/api/admin/sys-public-param'
import {
	openFlv
} from '@/api/yy_ml.js'
import flvjs from 'flv.js'
import {
	request
} from '@/utils/request/request2';
import config from '@/config/index.config';

export const startRealPlay = (videoConfig, videoElement, callback) => {
	let basePlayUrl = videoConfig.flvStream
	if (basePlayUrl) {
		request({
			url: config.baseUrl + getMultiValueByKeys,
			method: 'get',
			params: {
				keys: "publicIp,privateIp,videoLivePort"
			}
		}).then(response => {
			let publicIp = response.data.data.publicIp;
			// let privateIp = response.data.data.privateIp;
			let videoLivePort = 2935
			if (response.data.data.videoLivePort)
				videoLivePort = response.data.data.videoLivePort
			let videoId = '' + videoConfig.id
			let splitPos = videoId.indexOf('_')
			if (splitPos < 0)
				splitPos = videoId.indexOf('-')
			if (splitPos > 0)
				videoId = videoId.substring(0, splitPos)
			request({
				url: config.baseUrl + openFlv,
				method: 'post',
				params: {
					id: videoId
				}
			}).then((res) => {
				let playUrl = 'http://' + (publicIp ? publicIp : window.location.hostname) + ":" +
					videoLivePort + basePlayUrl
				console.log(playUrl)
				let player = flvjs.createPlayer({
					type: 'flv',
					isLive: true,
					url: playUrl
				});
				player.attachMediaElement(videoElement);
				player.load();
				player.play();
				callback(player)
			})
		})
	}
}
export const closeRealPlay = (player) => {
	if (player) {
		player.pause();
		player.unload();
		player.detachMediaElement();
		player.destroy()
	}
}
