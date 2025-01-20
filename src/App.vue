<script>
import DB from "@/utils/sqlite/sqlite.js"

export default {
  onLaunch: async function() {
	try {
      const res = await DB.openSqlite();
      console.log("创建/开启数据库", res);

      // 初始化用户表并插入初始数据
      await DB.initializeUserTable();
	  // initialize task table
	  DB.initializeTaskTable();
	  DB.initializeTaskItemTable();
	  
    } catch (err) {
      console.error("创建/开启数据库失败", err);
    }
},
  onShow: function() {
    console.log("App Show");
},
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni.scss";
@import "@/static/css/reset.scss";
@import "@/static/css/uni.scss";
@import "@/static/css/common.scss";
// 导入colorUI
@import "@/static/css/colorui/main.css";
@import "@/static/css/colorui/icon.css";
@import "@/static/css/colorui/animation.css";
@import "@/static/css/iconfont/iconfont.css";
</style>