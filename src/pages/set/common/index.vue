<template>
  <view class="" style="padding-bottom: 100px">
    <checkbox-group @change="checkboxChange">
      <label
        class="uni-list-cell uni-list-cell-pd"
        style="justify-content: flex-start"
        v-for="(item, index) in moudleList"
        :key="index"
      >
        <view>
          <checkbox :value="item.title" :checked="item.checked" />
        </view>
        <view style="margin-left: 8px">{{ item.title }}</view>
      </label>
    </checkbox-group>
    <view class="confirm-btn-wrapper">
      <button
        class="confirm-btn"
        :class="'bg-' + pageStore.$state.themeColor.name"
        @tap="submit()"
      >
        保存
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      moudleList: this.pageStore.$state.commonModules,
    };
  },
  onShow() {
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.pageStore.$state.themeColor.color,
      animation: {
        duration: 400,
        timingFunc: "easeIn",
      },
    });
  },
  methods: {
    checkboxChange: function (e) {
      let items = this.moudleList;
      let values = e.detail.value;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (values.includes(item.title)) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      }
    },
    submit() {
      this.pageStore.setCommonModules(this.moudleList);
      this.$mHelper.toast("保存成功");
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  padding-bottom: 10px;
}

.confirm-btn-wrapper {
  position: fixed;
  width: 100%;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  z-index: 99;
  left: 0;
  background: #fff;
  padding-bottom: 10px;
}
</style>
