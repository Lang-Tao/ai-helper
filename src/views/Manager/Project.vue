<template>
  <div>
    <el-header>
      <el-menu style="display:flex; padding-left: 20px; " :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/project/involved">参与项目</el-menu-item>
        <el-menu-item index="/project/manage">管理项目</el-menu-item>
        <el-menu-item index="/project/all">全部项目</el-menu-item>

        <button class="createBtn" style="height:40px; margin-left:auto; margin-top:10px; margin-right:20px" @click="$router.push('/project-creat')">
          + 创建项目
        </button>
      </el-menu>
    </el-header>

    <el-main style="padding:0px">
    
      <div>
        <router-view/>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "repository",
  data() {
    return {
     
    };
  },
 
}
</script>

<style scoped>
.el-header {
  color: #333;
  line-height: 60px;
  padding: 0 !important;
  border: 0 !important;
}
.el-menu {
  width: 100%;
  border-bottom: 1px solid rgba(208, 208, 208, 0.6) !important;
}
.el-menu-item {
  font-size: 16px;
}

.createBtn {
  padding: 15px 25px;
  border: unset;
  border-radius: 8px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  transition: all 250ms;
  overflow: hidden;
  line-height: 3px;
}

.createBtn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 5px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms;
}

.createBtn:hover {
  color: #e8e8e8;
}

.createBtn:hover::before {
  width: 100%;
}
</style>
