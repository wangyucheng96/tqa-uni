<template>
  <view class="step-bar">
    <view
      v-for="(step, index) in list1"
      :key="index"
      class="step-item"
      @click="handleStepClick(index)"
    >
      {{ step.title }}
    </view>
  </view>
</template>

<script>
export default {
  props: ['list1'],
  methods: {
    handleStepClick(stepIndex) {
      this.$emit('clickStep', stepIndex);
    }
  }
};
</script>

<style scoped>
.step-bar {
  display: flex;
  flex-direction: column;
}
.step-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.step-item:last-child {
  border-bottom: none;
}
</style>