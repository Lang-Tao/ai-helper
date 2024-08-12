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
      activePath: '/check/person-check', // Default path
    };
  }
}
</script>

<style scoped>
.el-menu-item.is-active {
  margin: 0 !important; 
  background-color: #ecf5ff;
  color: #409EFF;
}
.el-menu-item {
  transition: none !important; 
  text-align: center;
}
</style>