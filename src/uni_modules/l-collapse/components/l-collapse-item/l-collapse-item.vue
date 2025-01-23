<template>
	<view class="l-collapse-item">
		<view @click="onClick(!isOpen)" class="l-collapse-item__title l-collapse-item-border"
			:class="{'is-open':isOpen}">
			<view class="l-collapse-item__title-wrap">
				<slot name="title">
					<view class="l-collapse-item__title-box">
						<image v-if="titleImg" :src="titleImg" class="l-collapse-item__title-img" />
						<text class="l-collapse-item__title-text">{{ title }}</text>
					</view>
				</slot>
			</view>
			<view :class="{ 'l-collapse-item__title-arrow-active ': isOpen, }"
				class="l-collapse-item__title-arrow l-collapse-item--animation">
				<view class="l-icons icon-xiala"></view>
			</view>
		</view>
		<view class="l-collapse-item__wrap is--transition" :style="{height: (isOpen?height:0) +'px'}">
			<view :id="elId" ref="collapse--hook" class="l-collapse-item__wrap-content"
				:class="{open:isheight,'l-collapse-item--border':isOpen}">
				<slot></slot>
			</view>
		</view>

	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	export default {
		name: 'lCollapseItem',
		props: {
			// 列表标题
			title: {
				type: String,
				default: ''
			},
			// 是否展开
			open: {
				type: Boolean,
				default: false
			},
			// 标题左侧缩略图
			titleImg: {
				type: String,
				default: ''
			},
		},
		data() {
			// TODO 随机生生元素ID，解决百度小程序获取同一个元素位置信息的bug
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				isOpen: false,
				isheight: null,
				height: 0,
				elId,
				nameSync: 0
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
				this.onClick(val, 'init')
			}
		},
		created() {
			this.collapse = this.getCollapse()
			this.onClick(this.open, 'init')
		},
		mounted() {
			if (!this.collapse) return
			this.nameSync = this.collapse.childrens.length + ''

			if (this.collapse.names.indexOf(this.nameSync) === -1) {
				this.collapse.names.push(this.nameSync)
			}
			if (this.collapse.childrens.indexOf(this) === -1) {
				this.collapse.childrens.push(this)
			}
			this.init()
		},
		methods: {
			init(type) {
				// #ifndef APP-NVUE
				this.getCollapseHeight(type)
				// #endif
				// #ifdef APP-NVUE
				this.getNvueHwight(type)
				// #endif
			},
			onClick(isOpen, type) {
				this.isOpen = isOpen
				if (this.isOpen && this.collapse) {
					this.collapse.setAccordion(this)
				}
			},
			getCollapseHeight(type, index = 0) {
				const views = uni.createSelectorQuery().in(this)
				views
					.select(`#${this.elId}`)
					.fields({
						size: true
					}, data => {
						// TODO 百度中可能获取不到节点信息 ，需要循环获取
						if (index >= 10) return
						if (!data) {
							index++
							this.getCollapseHeight(false, index)
							return
						}
						// #ifdef APP-NVUE
						this.height = data.height + 1
						// #endif
						// #ifndef APP-NVUE
						this.height = data.height
						// #endif
						this.isheight = true
						if (type) return
						this.onClick(this.isOpen, 'init')
					})
					.exec()
			},
			getNvueHwight(type) {
				const result = dom.getComponentRect(this.$refs['collapse--hook'], option => {
					if (option && option.result && option.size) {
						// #ifdef APP-NVUE
						this.height = option.size.height + 1
						// #endif
						// #ifndef APP-NVUE
						this.height = option.size.height
						// #endif
						this.isheight = true
						if (type) return
						this.onClick(this.open, 'init')
					}
				})
			},
			/**
			 * 获取父元素实例
			 */
			getCollapse(name = 'lCollapse') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
	    font-family: 'l-icons';
	    src: url('data:font/ttf;charset=utf-8;base64,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') format('truetype');
	    font-weight: normal;
	    font-style: normal;
	    font-display: swap;
	}
	.l-icons {
		font-family: "l-icons" !important;
		font-size: 30rpx;
		font-style: normal;
		color: #bbb;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-xiala:before {
	  content: "\e6b9";
	}
	
	.l-collapse-item {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;

		/* #endif */
		&__title {
			/* #ifndef APP-NVUE */
			display: flex;
			width: 100%;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			transition: border-bottom-color .3s;

			&-wrap {
				width: 100%;
				flex: 1;

			}

			&-box {
				padding: 0 20rpx;
				/* #ifndef APP-NVUE */
				display: flex;
				width: 100%;
				box-sizing: border-box;
				/* #endif */
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				line-height: 90rpx;
				background-color: #fff;
				color: #303133;
				font-size: 26rpx;
				font-weight: 500;
				/* #ifdef H5 */
				cursor: pointer;
				outline: none;

				/* #endif */

			}

			&.l-collapse-item-border {
				border-bottom: 1px solid #ebeef5;
			}

			&.is-open {
				border-bottom-color: transparent;
			}

			&-img {
				height: 44rpx;
				width: 44rpx;
				margin-right: 20rpx;
			}

			&-text {
				flex: 1;
				font-size: 28rpx;
				/* #ifndef APP-NVUE */
				white-space: nowrap;
				color: inherit;
				/* #endif */
				/* #ifdef APP-NVUE */
				lines: 1;
				/* #endif */
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&-arrow {
				/* #ifndef APP-NVUE */
				display: flex;
				box-sizing: border-box;
				/* #endif */
				align-items: center;
				justify-content: center;
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
				transform: rotate(0deg);

				&-active {
					transform: rotate(-180deg);
				}
			}


		}

		&__wrap {
			/* #ifndef APP-NVUE */
			will-change: height;
			box-sizing: border-box;
			/* #endif */
			background-color: #fff;
			overflow: hidden;
			position: relative;
			height: 0;

			&.is--transition {
				transition-property: height, border-bottom-width;
				transition-duration: 0.3s;
				/* #ifndef APP-NVUE */
				will-change: height;
				/* #endif */
			}



			&-content {
				position: absolute;
				font-size: 26rpx;
				color: #303133;
				border-bottom-color: transparent;
				border-bottom-style: solid;
				border-bottom-width: 0;

				&.l-collapse-item--border {
					border-bottom-width: 1px;
					border-bottom-color: red;
					border-bottom-color: #ebeef5;
				}

				&.open {
					position: relative;
				}
			}
		}

		&--animation {
			transition-property: transform;
			transition-duration: 0.3s;
			transition-timing-function: ease;
		}

	}
</style>
