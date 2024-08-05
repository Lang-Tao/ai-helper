<template>
  <div>
    <el-container>
      <!--        头部-->
      <el-header style="display: flex; color: white">
        <i
          @click="handleCollapse"
          style="font-size: 26px"
          :class="collapseIcon"></i>
        <span style="padding-left: 20px; font-size: 20px">logo</span>

        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 300px; margin-left: 500px; justify-content: center"
          size="small">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <div
          style="
            padding-left: 50px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            width: 500px;
          ">
          <span>集团账号</span>
          <span>备案</span>
          <span>工具</span>
          <span>客服支持</span>
          <span>试用</span>
          <span>费用</span>
          <i
            style="align-items: center; font-size: 20px"
            class="el-icon-question"></i>
          <i
            style="align-items: center; font-size: 20px"
            class="el-icon-message-solid"></i>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            cursor: default;
            padding-left: 200px;
          ">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            ">
            <span style="font-size: 10px">99999999</span>
            <span style="font-size: 10px">主账号</span>
          </div>
          <img
            src="@/assets/img/logo1.png"
            alt=""
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-left: 20px;
              margin-right: 10px;
            " />
        </div>
      </el-header>

      <el-container>
        <!--      侧边栏-->
        <el-aside
          :width="asideWidth"
          style="min-height: 100vh; background-color: #333333">
          <!--          <div style="height: 60px; background-color: #333333; color:white; display: flex; justify-content: center; align-items: center">-->
          <!--            <img src="../assets/logo1.png" alt="" style="width: 40px; height: 40px">-->
          <!--            <transition name="el-fade-in">-->
          <!--              <span v-show="!isCollapsed" style="margin: 4px">vue2学习</span>-->
          <!--            </transition>-->
          <!--          </div>-->

          <el-menu
            :collapse="isCollapsed"
            :collapse-transition="false"
            router
            text-color="rgba(256,256,256,0.65)"
            background-color="#001925"
            active-text-color="#FFF"
            style="border: none"
            :default-active="$route.path">

            <el-menu-item index="/home">
              <i class="el-icon-house"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>

            <el-menu-item index="/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>项目管理</span>
              </template>

              <el-menu-item index="/repositories">项目仓库</el-menu-item>
              <el-menu-item index="protect">项目维护</el-menu-item>
              <el-menu-item index="summary">项目总结</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-set-up"></i>
                <span>提交管理记录</span>
              </template>

              <el-menu-item index="audit">智能审查</el-menu-item>
              <el-menu-item index="">智能导读</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <!--        内容区域-->
        <el-main>
          <router-view/>
        </el-main>
          
      </el-container>
    </el-container>
  </div>
</template>

<
<script>
  import axios from "axios";

  export default {
    name: "manager",
    data() {
      return {
        isCollapsed: false,
        asideWidth: "200px",
        collapseIcon: "el-icon-s-fold",
        users: [{avater: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"}],
      };
    },
    mounted() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
      });
    },
    methods: {
      handleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          this.asideWidth = "64px";
          this.collapseIcon = "el-icon-s-unfold";
        } else {
          this.asideWidth = "200px";
          this.collapseIcon = "el-icon-s-fold";
        }
      },
    },
  };
</script>

<style>
  .el-menu--inline .el-menu-item {
    background-color: #282828 !important;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover {
    color: #fff !important;
  }
  .el-menu-item.is-active {
    background-color: #40a9ff !important;
    border-radius: 4px !important;
    /* margin: 4px !important; */
  }
  .el-menu-item,.el-submenu__title {
    background-color: #333333 !important;
    height: 40px !important;
    line-height: 40px !important;
  }
  .el-submenu__title:hover i {
    color: #fff !important;
  }
  .el-menu-item:hover i {
    color: #fff !important;
  }
  .el-submenu .el-menu-item {
    min-width: 0 !important;
  }
  .el-aside {
    background-color: #333333 !important;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: all 0.3s;
  }
  .el-header {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    display: flex;
    align-items: center;
    background-color: #333333;
    border-bottom: 1px solid rgba(208, 208, 208, 0.6);
  }
  .el-icon-s-fold {
    margin-top: 0 !important;
  }
  .el-icon-s-unfold {
    margin-top: 0 !important;
  }
  .el-menu {
    background-color: #333333 !important;
  }
  .el-menu--inline {
  background-color: #000c17 !important;

}
.el-menu--inline .el-menu-item {
  padding-left: 49px !important;
}


.el-menu-item.is-active {
  border-radius: 4px !important;
  width: calc(100% - 8px);
  margin-left: 4px;
}
.el-menu-item.is-active i, .el-menu-item.is-active .el-tooltip{
  margin-left: -4px;
}
.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
.el-menu--inline .el-menu-item.is-active {
  padding-left: 45px !important;
}



</style>
