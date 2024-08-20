<template>
  <div>
    <el-aside width="200px" style="height: 100vh;position:fixed">
      <el-menu
        :default-active="activePath"
        style="height: 100vh;"
        router
      >
        <el-menu-item index="/check/person-check">
          <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-rengongshencha" />
          <span slot="title">人工审查</span>
        </el-menu-item>
        <el-menu-item index="/check/intelligence-check">
          <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-zhinengshencha" />
          <span slot="title">智能审查</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main style="padding: 0 20px; margin-left: 200px;">
      <router-view/>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: `${this.$route.path.split('/').slice(0, 3).join('/')}`, 
    };
  },
  created() {
   
  },
}
</script>

<style scoped>
.el-menu-item {
  transition: none !important; 
  text-align: center;
  margin:5px;
  border-radius:8px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #54575c;
}
.el-menu-item:hover {
  background-color: #eceff5; /*悬浮颜色*/
  color: #54575c !important;
}
.el-menu-item.is-active { 
  background-color: #e5ecff !important;  /*选中颜色*/
  color: #3f6ffc !important;  /*选中文字颜色*/
}
.el-main{
  padding: 0 !important;
}
</style>