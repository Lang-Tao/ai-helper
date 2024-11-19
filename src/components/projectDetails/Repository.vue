<template>
  <div style="overflow-x:hidden" >
      <!-- 头部栏 -->
      <div class="header">
        <span class="repository-name"> Lilishop 商城系统</span>
        <el-menu style="display:flex; padding-left: 20px; " :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
          <el-menu-item :index="`/project-details/${address}/Repository/git`"><i class="iconfont icon-code"></i>代码</el-menu-item>
          <el-menu-item :index="`/project-details/${address}/Repository/merges`"><i class="iconfont icon-hebingqingqiu"></i>合并请求</el-menu-item>
          <el-menu-item :index="`/project-details/${address}/Repository/settings`"><i class="iconfont icon-shezhi"></i>设置</el-menu-item>
        </el-menu>
      </div>
      <!--内容栏-->
      <div style="background-color: #fafbfc; padding-top:5px; ">
        <router-view/>
      </div>
  </div>
</template>

<script>
export default {
  props: ['address'],
  data() {
    return {};
  },
  
};
</script>

<style scoped lang="scss">
.header {
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  padding: 0;
  background-color: #fafbfc;
}
.el-menu {
  width: 1500px;
  padding: 0 0 0 40px;
  border-bottom: 1px solid #dbdbdba2;
  background-color: #fafbfc;
  box-shadow: 0 1px 2px 0px rgba(90, 90, 90, 0.1)
}
.el-menu-item {
  height: 50px;
  font-size: 15px;
  margin:0 10px;
  background-color: #fafbfc;
  
}
.el-menu-item:hover{
  font-weight: bold;
  background-color: #fafbfc !important;
}
.el-menu-item.is-active{
  font-weight: bold;
  background-color: #fafbfc !important;
}
.iconfont{
  margin:0 5px;
}
.el-menu-item:hover i{
  color:black;
}
.repository-name{
  margin-left: 40px;
  margin-top: 20px;
  font-size: 20px;
}
</style>

