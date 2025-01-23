# l-collapse
# ## 使用方法
配置easycom规则后，自动按需引入，无需`import`组件，直接引用即可。

```html
<template>
	<l-collapse :accordion="true">
		<l-collapse-item title="折叠面板" titleImg="/static/logo.png">
			<view class="content">
				<text class="text">折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板</text>
			</view>
		</l-collapse-item>
		<l-collapse-item title="折叠面板" :open="true" titleImg="/static/logo.png">
			<view class="content">
				<text class="text">折叠面板</text>
			</view>
		</l-collapse-item>
		<l-collapse-item title="折叠面板">
			<view class="content">
				<text class="text">折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板折叠面板</text>
			</view>
		</l-collapse-item>
	</l-collapse>
</template>
```

## l-collapse组件属性

| 属性 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|---|
| accordion | Boolean | false | 是否开启手风琴效果 |
## l-collapse-item组件属性

| 属性 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|---|
| title | String | - | 列表标题 |
| open | Boolean | false | 是否展开 |
| titleImg | String | - | 标题左侧缩略图 |