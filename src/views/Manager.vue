<template>
  <div id="app">
    <el-container>
      <el-aside :width="iscollapsed ? '64px' : '200px'" style="height:100vh">
        <el-menu :default-active="defaultActivePath" :collapse="iscollapsed" :collapse-transition="false" router style="display: flex; flex-direction: column; height: 100%;">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">工作台</span>
          </el-menu-item>

          <el-menu-item index="/project">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">项目</span>
          </el-menu-item>

          <el-menu-item index="/check">
            <i class="el-icon-tickets"></i>
            <span slot="title">审查</span>
          </el-menu-item>

          <el-menu-item index="/team">
            <i class="el-icon-user"></i>
            <span slot="title">用户/团队</span>
          </el-menu-item>

          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>

          

          <el-menu-item index="/person" style="margin-top: auto;" class="avatar-item">
            <el-dropdown placement="bottom">
              <div class="avatar-container" style="display:flex; text-align:center; justify-content: center;">
                <img src="@/assets/img/defaultAvater.jpg" alt="" class="avatar-img">
                <transition name="el-fade-in">
                  <span v-show="!iscollapsed" class="username">用户名</span>
                </transition>
              </div>
              <el-dropdown-menu slot="dropdown" placement="bottom-end">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout()" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container :style="{ marginLeft: iscollapsed ? '64px' : '200px' }" class="main-container">

        <!--头部栏-->
        <el-header >
          <i :class="CollapseIcon" class="collapse-icon" @click="toggleCollapse"></i>
          <span v-if="ActivePath !== '//project-details'" class="header-title">{{ currentPageTitle }}</span>
          <div v-else>
            <span class="header-router"  @click="$router.push('/project')" >项目</span>
            <span class="header-title" >/  {{ Project.name }}</span>
            
          </div>
        </el-header>



        <!--内容栏-->
        <el-main>
          <router-view/>
        </el-main>


      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "manager",
  data() {
    return {
      iscollapsed: true,
      defaultActivePath: '',
      ActivePath: '',
      ProjectAddress: '',
      Project:{},

    };
  },
  computed: {
    currentPageTitle() {
      return this.$route.meta.title || '未命名页面';
    },
    CollapseIcon() {
      return this.iscollapsed ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
  },
  methods: {
    toggleCollapse() {
      this.iscollapsed = !this.iscollapsed;
    },
    getProjectByAddress(ProjectAddress){  // todo 根据地址获取项目信息
      return {
        name: "Lilishop 商城系统",
        address: "xiangmu1",
        admin: "管理员1",
        adminAvatar: "",
        operation: "操作1",
        accessTime: "2024-08-07",
        createTime: "2024-08-01",
      };
    },
    
    logout() {
      this.$confirm("确定退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        localStorage.removeItem('token');
        this.$router.push("/login");
      })
      .catch(() => {});
    }


  },
  created() {
    this.defaultActivePath = `${this.$route.path.split('/').slice(0, 2).join('/')}`;
    this.ActivePath = `/${this.$route.path.split('/').slice(0, 2).join('/')}`;
    this.ProjectAddress = `${this.$route.path.split('/').slice(2,3).join('/')}` ;
     this.Project = this.getProjectByAddress(this.ProjectAddress);
  },
  watch:{
    $route(to){
      this. ActivePath = `/${to.path.split('/').slice(0, 2).join('/')}`;
      this.ProjectAddress = `${this.$route.path.split('/').slice(2,3).join('/')}` ;
      this.Project = this.getProjectByAddress(this.ProjectAddress);
    }
  },
  
};
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: black;
  line-height: 60px;
  border-bottom: 1px solid #E0E6ED;
  padding:0px !important;
  z-index: 1000;
  position: fixed;
  width: 100%;
  top: 0;
}
.el-aside {
  background-color: #ffffff;
  color: #54575c;
  overflow: hidden; 
  transition: width 0.3s ease-in-out;
  position: fixed;
}
.el-menu {
  background-color: #fcfdfd;  /*侧边栏颜色*/
  border-right: 1px solid #E0E6ED;
  height: 100%;
  overflow: hidden; 
}
.el-menu-item {
  color: #54575c;
  margin: 2px;
  border-radius: 4px;
}
.el-menu-item:hover {
  background-color: #eceff5; /*悬浮颜色*/
  color: #54575c !important;
}
.el-menu-item.is-active {
  background-color: #e5ecff !important;  /*选中颜色*/
  color: #3f6ffc !important;  /*选中文字颜色*/
}
.el-main {
  padding: 0px !important;
  margin-top:60px;
}
.collapse-icon {
  margin-left: 13px ;
  font-size: 20px;
  cursor: pointer;
}
.header-title {
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  margin: 10px;
}
.header-router{
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  margin: 10px;
}
.header-router:hover{
  cursor:pointer;
  color:#2a75ff
}
.avatar-container {
  height: 100%;
  margin-bottom: 10px !important;
}
.avatar-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin:0 10px 0 8px;
}
.username {
  color:#54575c;
  border: 0px;
  text-align:center !important; 
  margin: 4px;
  margin-left: 20px !important;
  margin-bottom: 10px !important;
  line-height: 31px;
}
.avatar-item{
  padding: 6px !important;
}
.main-container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.3s ease-in-out;
}
.-webkit-scrollbar {
    display: none;
}

</style>
