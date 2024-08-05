<template>
  <div>
    <el-header >
      <el-menu style="display:flex;" :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/repositories/involved">参与项目</el-menu-item>
        <el-menu-item index="/repositories/manage">管理项目</el-menu-item>
        <el-menu-item index="/repositories/all">全部项目</el-menu-item>

        <el-button type="primary" style="height:40px; margin-left:auto; margin-top:10px; margin-right:20px" @click="$router.push('/repositories/create')">创建项目</el-button>
      </el-menu>
    </el-header>

    <el-main>
      <router-view/>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "repository",
  data() {
    return {};
  }
}
</script>

<style scoped>
.el-header {
  color: #333;
  line-height: 60px;
  padding: 0 !important;
  border: 0 !important;
}
.el-menu{
  width: 100%;
  border-bottom: 1px solid rgba(208, 208, 208, 0.6) !important;
}
</style>
