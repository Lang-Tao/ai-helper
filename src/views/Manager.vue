<template>
  <div id="app">
    <el-container>
      <el-aside :width="iscollapsed ? '64px' : '200px'" style="height:100vh">
        <el-menu :default-active="defaultActivePath" :collapse="iscollapsed" :collapse-transition="false" router style="display: flex; flex-direction: column; height: 100%;">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">工作台</span>
          </el-menu-item>

          <el-menu-item index="/repositories">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">项目</span>
          </el-menu-item>

          <el-menu-item index="/check">
            <i class="el-icon-tickets"></i>
            <span slot="title">审查</span>
          </el-menu-item>

          <el-menu-item index="/knowledge">
            <i class="el-icon-s-management"></i>
            <span slot="title">知识库</span>
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
              <div class="avatar-container" style="display:flex; text-align:center; justify-content: center; ">
                <img  src="@/assets/img/logo1.png" alt="" class="avatar-img">
                <transition name="el-fade-in">
                  <span  v-show="!iscollapsed" class="username">用户名</span>
                </transition>
              </div>
              <el-dropdown-menu slot="dropdown" placement="bottom-end">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/login')" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <i :class="CollapseIcon" class="collapse-icon" @click="toggleCollapse"></i>
          <span class="header-title">{{ currentPageTitle }}</span>
        </el-header>
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
      iscollapsed: false,
      defaultActivePath: '',
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
    }
  },
  created() {
    this.defaultActivePath = `/${this.$route.path.split('/').slice(0, 2).join('/')}`;
  }
};
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #F5F7FA;
  color: black;
  line-height: 60px;
  border-bottom: 1px solid #E0E6ED;
  padding: 0 20px; /* 添加内边距使内容有间隔 */
}
.el-aside {
  background-color: #2E363F;
  color: white;
  overflow: hidden; /* 取消滚动条 */
  transition: width 0.3s ease-in-out;
}
.el-menu {
  background-color: #2E363F;
  border-right: 1px solid #E0E6ED;
  height: 100%;
  overflow: hidden; /* 取消滚动条 */
}
.el-menu-item {
  color: white;
  margin: 2px;
  border-radius: 4px;
}
.el-menu-item:hover {
  background-color: #1C2330;
  color: white !important;
}
.el-menu-item.is-active {
  background-color: #1C2330 !important;
  color: white !important;
}
.el-main {
  padding: 0px !important;
}
.collapse-icon {
  font-size: 20px;
  cursor: pointer;
}
.header-title {
  font-size: 26px;
  font-weight: bold;
  margin: 10px;
}
.avatar-container {
  height: 100%;
  margin-bottom: 10px !important;
}
.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.username {
  color:white;
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
</style>
