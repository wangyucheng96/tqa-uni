<template>
  <view class="container">
    <view class="header">
      <input type="text" v-model="searchQuery" placeholder="搜索" />
      <button class="tech-button"  @click="searchTasks">搜索</button>
    </view>
	<view class="model-title">
	  <text>型号列表</text>
	  </view>
    <view class="model-list">
      <view class="model-item" v-for="(item, index) in modelList" :key="index">
        <text @click="selectModel(item.product_code)">{{ item.product_code }}</text>
      </view>
    </view>
    <scroll-view class="task-list" scroll-y="true">
      <view class="task-item" v-for="(task, index) in filteredTasks" :key="index">
        <view class="task-left">
          <text class="task-product-code">{{ task.product_code }}</text>
          <text class="task-part">{{ task.part }}</text>
        </view>
        <text class="task-id">{{ task.task_id }}</text>
        <text class="task-status">{{ task.task_status }}</text>
      </view>
    </scroll-view>
    <view class="pagination">
      <button class="tech-button" @click="prevPage">上一页</button>
      <text>{{ currentPage }}/{{ totalPages }}</text>
      <button class="tech-button" @click="nextPage">下一页</button>
    </view>
    <view class="footer">
	  <navigator class="hyperlink" :url="'/pages/dataImport/index'" hover-class="none">
			<button class="tech-button">数据导入</button>
	  </navigator>
	  <navigator class="hyperlink" :url="'/pages/taskExecution/index'" hover-class="none">
			<button class="tech-button">任务执行</button>
	  </navigator>
	  <navigator class="hyperlink" :url="'/pages/dataSynchronization/index'" hover-class="none">
			<button class="tech-button">数据同步</button>
	  </navigator>
    </view>
  </view>
</template>

<script>
import DB from "@/utils/sqlite/sqlite.js";

export default {
  data() {
    return {
	  searchQuery: '', // 搜索框绑定的值
	  filteredTasks: [], // 用于存储搜索结果
      modelList: [{}],
	  selectedModel: "全部",
      tasks: [{}],
      currentPage: 1,
      totalPages: 1
    };
  },
    onLoad() {
    		const dbTablesql = "task";
    		//const lname = "'projectname'";
    		DB.selectTableData(dbTablesql).then((res) => {
    		//console.log('res',res);	
    	
    		const result2 = res.map((item, index) => ({
    			id: index + 1, // 使用 task_id 作为 id
    			task_id: item.task_id,
  			    product_code: item.product_code,
    			product_name: item.product_name,// 拼接 product_code, product_name, part_code
				part: item.part_name,
    			task_code: item.task_code,
    			task_name: item.task_name,
    			task_status: item.task_status,
    			task_result:  item.task_result
    		}));
			const result = res.map((item,index) => ({
				id: index + 1, // 使用 task_id 作为 id
				product_code: item.product_code
			}));
    		this.tasks = result2;
			this.filteredTasks = result2;
			console.log("tasks: ",this.tasks);
			console.log("filteredTasks: ",this.filteredTasks);
			result.push({ id: result.length + 1, product_code: "全部" });
			this.modelList = result;
			console.log("modelList: ",this.modelList);
    		}).catch((err) => {
    		console.error("查询task失败", err);
    		this.$mHelper.toast("查询task失败");
    		this.btnLoading = false;
    	});
    },
	computed: {
	/*
	  filteredTasks() {
	    // 根据选中的型号筛选任务列表
	    if (this.selectedModel === "全部") {
	      return this.tasks; // 选择“全部”时显示所有任务
	    } else {
	      return this.tasks.filter(task => task.product_code === this.selectedModel);
	    }
	  },*/
	},
  methods: {
	selectModel(model) {
	      this.selectedModel = model; // 更新选中的型号
		  if (this.selectedModel === "全部") {
		    this.filteredTasks = this.tasks; // 选择“全部”时显示所有任务
		  } else {
		     this.filteredTasks = this.tasks.filter(task => task.product_code === this.selectedModel);
		  }
	    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
	searchTasks() {
	      // 按照 task_id 搜索
	      const query = this.searchQuery.trim();
	      if (query) {
	        this.filteredTasks = this.tasks.filter(task => 
	          task.task_id.toLowerCase().includes(query.toLowerCase())
	        );
	      } else {
	        this.filteredTasks = []; // 清空搜索结果
	      }
	    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px; /* 添加内边距 */
}
.model-list {
  display: flex;
  flex-direction: row; /* 子元素水平排列 */
  flex-wrap: nowrap; /* 确保子元素不会换行 */
  margin-top: 10px;
  overflow-x: auto; /* 如果内容超出容器宽度，允许滚动 */
}
.model-title {
  font-size: 16px; /* 标题字号 */
  font-weight: bold; /* 标题加粗 */
  text-align: center; /* 文本居中对齐 */
  margin-bottom: 10px; /* 标题与下方内容的间距 */
}
.model-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px; /* 添加右侧间距，避免元素紧挨在一起 */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  font-size: 10px; /* 将字号改小 */
  white-space: nowrap; /* 防止内容换行 */
}
.task-list {
  margin-top: 10px;
  height: 300px;
}
.task-item {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: flex-start; /* 对齐方式：从顶部开始 */
  justify-content: space-between; /* 子元素平均分布在两端 */
  padding: 20rpx; /* 调整内边距 */
  border-bottom: 1px solid #eee; /* 添加分割线 */
}

.task-left {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: flex-start; /* 从顶部开始对齐 */
  width: 50%; /* 占据一半宽度，可根据需要调整 */
}

.task-product-code {
  font-size: 32rpx; /* 最大字号 */
  font-weight: bold; /* 加粗显示 */
}

.task-part {
  font-size: 28rpx; /* 中等字号 */
}

.task-id {
  font-size: 3rpx; /* 稍小字号 */
  color: #888; /* 淡色显示 */
  margin-left: auto; /* 推到右侧 */
}

.task-status {
  font-size: 24rpx; /* 最小字号 */
  color: #555; /* 中等颜色 */
  margin-left: auto; /* 推到右侧 */
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
/* 基础按钮样式 */
.tech-button {
  padding: 4px 8px; /* 减小按钮内边距，使按钮看起来更小 */
  font-size: 15px; /* 减小字体大小 */
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  background-image: linear-gradient(to right, #1078fe, #1078ff); /* 蓝色渐变背景 */  border-radius: 5px; /* 圆角效果 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  transition: transform 0.3s ease, background-image 0.3s ease; /* 动画过渡效果 */
}

/* 按钮悬停效果 */
.tech-button:hover {
  transform: scale(1.05); /* 按钮放大效果 */
  background-image: linear-gradient(to left, #3f51b5, #5c6773); /* 改变渐变方向 */
}

/* 按钮点击效果 */
.tech-button:active {
  transform: scale(0.95); /* 按钮缩小效果 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); /* 减小阴影效果 */
}
.hyperlink {
	  color: #007aff; /* 超链接颜色 */
	  text-decoration: underline; /* 添加下划线 */
	}
</style>
