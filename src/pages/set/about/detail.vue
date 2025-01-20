<template>
	<view class="about" >
		<view class="shop-info " v-if="title === '关于我们'">
			<view class="about-content" v-if="detail.about_me">
				<oa-parser lazy-load :html="detail.about_me"></oa-parser>
			</view>
			<oa-empty :info="`暂无${title}`" v-if="!detail.about_me "></oa-empty>
		</view>
		<view class="shop-info " v-if="title === '注册协议'">
			<view class="about-content" v-if="detail.protocol_register">
				<oa-parser lazy-load :html="detail.protocol_register"></oa-parser>
			</view>
			<oa-empty :info="`暂无${title}`" v-if="!detail.protocol_register "></oa-empty>
		</view>
		<view class="shop-info" v-if="title === '隐私协议'">
			<view class="about-content" v-if="detail.protocol_privacy">
				<oa-parser lazy-load :html="detail.protocol_privacy"></oa-parser>
			</view>
			<oa-empty :info="`暂无${title}`" v-if="!detail.protocol_privacy "></oa-empty>
		</view>

	</view>
</template>

<script>
	import oaParser from '@/components/oa-parser';
	import oaEmpty from '@/components/oa-empty';
	export default {
		components: {
			oaParser,oaEmpty
		},
		data() {
			return {
				detail: {"about_me":"<p></p><p>苏州运优科技有限公司（简称：运优科技）于2018 年 01 月 31 日在风清水秀的苏州工业园区（自贸区）成立。</p><p>公司创始团队成员来自于Oracle，紫光云，去哪儿，海格汽车，同程网络等国内外世界500强企业。</p><p>自主研发的产品SCPCloud（中文名：供应链优化云平台）是国内首创的基于运筹优化，AI和大数据的供应链优化云平台，已申请多个专利软著。</p><p>自主研发的产品SCPCloud（中文名：供应链优化云平台）是国内首创的基于运筹优化，AI和大数据的供应链优化云平台，已申请多个专利软著。</p><p>公司研发的基于“工业互联网 + 安全生产”的系统软件成功应用于化工行业。积累了上百家的化工行业的用户。</p><p>公司产品&解决方案目前已服务于多家企事业单位。</p><p><br/></p>"},
				title: null,
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
		onLoad(options) {
			this.title = options.title;
			uni.setNavigationBarTitle({
				title: options.title
			});
		},
		
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
		position: relative;

		.about {
			.shop-info {
				.about-content {
					padding: $spacing-lg;
				}

				text-align: left;

				image {
					margin-top: 100upx;
					width: 240upx;
					height: 240upx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
