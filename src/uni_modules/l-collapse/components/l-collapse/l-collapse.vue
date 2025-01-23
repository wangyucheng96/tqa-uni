<template>
	<view class="l-collapse">
		<slot />
	</view>
</template>
<script>
	export default {
		name: 'lCollapse',
		props: {
			accordion: {
				// 是否开启手风琴效果
				type: Boolean,
				default: false
			},
		},
		created() {
			this.childrens = []
			this.names = []
		},
		methods: {
			setAccordion(self) {
				if (!this.accordion) return
				this.childrens.forEach((vm, index) => {
					if (self !== vm) {
						vm.isOpen = false
					}
				})
			},
		}
	}
</script>
<style lang="scss" >
	
</style>
