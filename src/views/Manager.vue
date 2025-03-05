<template>
  <div id="app">
    <el-container>
      <el-aside width="64px" style="height:100vh">
        <el-menu :default-active="defaultActivePath" router style="display: flex; flex-direction: column; height: 100%;">

          <div class="logo-box">
            <img src="../assets/img/AIlogo.png" class="logo-img">
          </div>

          <!-- <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span class="menu-text" style="margin-left: -4.5px;" slot="title">工作台</span>
          </el-menu-item> -->

          <el-menu-item index="/project">
            <i class="el-icon-folder-opened"></i>
            <span class="menu-text" slot="title">项目</span>
          </el-menu-item>

          <el-menu-item index="/user">
            <i class="el-icon-files"></i>
            <span class="menu-text" slot="title">事项</span>
          </el-menu-item>

          <el-menu-item index="/AIqna">
            <i class="iconfont icon-zhinengwenda" style="margin-left:1px;padding:0;line-height: 22px;"></i>
            <span class="menu-text" slot="title">问答</span>
          </el-menu-item>

          <!-- <el-menu-item index="/check">
            <i class="el-icon-tickets"></i>
            <span class="menu-text" slot="title">审查</span>
          </el-menu-item> -->

          <el-menu-item index="/team">
            <i class="el-icon-user"></i>
            <span class="menu-text" slot="title">团队</span>
          </el-menu-item>

          <!-- <el-menu-item index="/study">
            <i class="el-icon-data-line"></i>
            <span class="menu-text" slot="title">课程</span>
          </el-menu-item> -->

          <!-- <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span class="menu-text" slot="title">设置</span>
          </el-menu-item> -->

          <div class="divider"></div>

          <el-menu-item index="/person" style="margin-top: auto;" class="avatar-item">
            <el-dropdown placement="bottom">
              <div class="avatar-container" style="display:flex; text-align:center; justify-content: center;">
                <img :src="this.$store.state.user.avatar" alt="" class="avatar-img">
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

      <el-container :style="{ marginLeft: '64px' }" class="main-container">

        <!--头部栏-->
        <el-header >
          
          <div v-if="ActivePath === '//project-details'">
            <span class="header-router"  @click="$router.push('/project')" >项目</span>
            <el-spinner v-if="isLoading" />

            <span v-else class="header-title" >/  {{ Project.name }}</span>
          </div>

          <div v-else-if="ActivePath === '//home' || ActivePath === '//home-task' || ActivePath === '//home-project'">
            <el-menu class="home-nav" :default-active="$route.path" router mode="horizontal">
              <el-menu-item class="home-nav-item" index="/home">
                <i style="line-height: 60px;font-size:16px !important" class="el-icon-document-copy"></i>
                研发任务工作台
              </el-menu-item>
              <el-menu-item class="home-nav-item" index="/home-task">
                <i style="line-height: 60px;font-size:16px !important" class="el-icon-pie-chart"></i>
                任务需求工作台</el-menu-item>
              <el-menu-item class="home-nav-item" index="/home-project">
                <i style="line-height: 60px;font-size:16px !important" class="el-icon-folder-opened"></i>
                项目管理工作台</el-menu-item>
            </el-menu>
          </div>

          <span v-else class="header-title">{{ currentPageTitle }}</span>
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
import { getProjectInfo } from "@/api/project";

export default {
	name: "manager",
	data() {
		return {
			defaultActivePath: "",
			ActivePath: "",
			ProjectAddress: "",
			Project: {},
			isLoading: false,
		};
	},
	computed: {
		currentPageTitle() {
			return this.$route.meta.title || "未命名页面";
		},
	},
	methods: {
		getProjectByAddress(ProjectAddress) {
			getProjectInfo(ProjectAddress).then((res) => {
				this.isLoading = true; // 开始加载
				console.log("地址" + ProjectAddress + "获取到项目：");
				console.log(res);
				if (res.code == 0) {
					this.Project.name = res.data.name;
					this.isLoading = false; // 加载完成
				} else {
					this.$message.error("获取失败");
				}
			});
		},

		logout() {
			this.$confirm("确定退出登录吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$store.commit("delToken");
					this.$store.commit("delUser");
					this.$message({
						type: "success",
						message: "退出成功",
					});
					this.$router.push("/login");
				})
				.catch(() => {});
		},
	},
	created() {
		this.defaultActivePath = `${this.$route.path
			.split("/")
			.slice(0, 2)
			.join("/")}`;
		this.ActivePath = `/${this.$route.path
			.split("/")
			.slice(0, 2)
			.join("/")}`;
		if (this.ActivePath === "//project-details") {
			this.ProjectAddress = `${this.$route.path
				.split("/")
				.slice(2, 3)
				.join("/")}`;
			console.log(this.ProjectAddress);
			this.getProjectByAddress(this.ProjectAddress);
		}
	},
	watch: {
		$route(to) {
			this.ActivePath = `/${to.path.split("/").slice(0, 2).join("/")}`;
			console.log(this.ActivePath);
			if (this.ActivePath === "//project-details") {
				this.ProjectAddress = `${this.$route.path
					.split("/")
					.slice(2, 3)
					.join("/")}`;
				console.log(this.ProjectAddress);
				this.getProjectByAddress(this.ProjectAddress);
			}
		},
	},
};
</script>

<style scoped>
.logo-box {
	display: flex;
	justify-content: center;
}
.logo-img {
	width: 40px;
	height: 40px;
	margin: 13px 0 6px 0;
	border-radius: 5px;
}
.el-header {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	color: black;
	line-height: 60px;
	border-bottom: 1px solid #e0e6ed;
	padding-left: 10px;
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
	background-color: #eceff558; /*侧边栏颜色*/
	border-right: 0.5px solid #0000001f;
	height: 100%;
	overflow: hidden;
}
.el-menu-item {
	color: #54575c;
	margin: 2px;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	padding: 9px;
}
.el-menu-item:hover {
	background-color: #eceff5; /*悬浮颜色*/
	color: #54575c !important;
}
.el-menu-item.is-active {
	background-color: #e5ecff !important; /*选中颜色*/
	color: #3f6ffc !important; /*选中文字颜色*/
}
.menu-text {
	font-size: 12px;
	position: relative;
	line-height: 14px;
	margin-top: 6px;
	margin-left: -5.5px;
	text-align: center;
	left: -2.5px;
}
.el-main {
	padding: 0px !important;
	margin-top: 60px;
}
.header-title {
	text-align: center;
	font-size: 18px;
	font-weight: bold;
	margin: 10px;
	cursor: default;
}
.header-router {
	text-align: center;
	font-size: 18px;
	font-weight: 500;
	margin: 10px;
}
.header-router:hover {
	cursor: pointer;
	color: #2a75ff;
}
.avatar-container {
	height: 100%;
	margin-bottom: 10px !important;
}
.avatar-img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin: 10px;
}
.username {
	color: #54575c;
	border: 0px;
	text-align: center !important;
	margin: 4px;
	margin-left: 20px !important;
	margin-bottom: 10px !important;
	line-height: 31px;
}
.avatar-item {
	padding: 6px !important;
}
.main-container {
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
i {
	font-size: 20px !important;
	color: #6c6c6cc1;
	margin-left: -2px;
}
.divider {
	margin: 8px 13px;
	border-bottom: 1px solid #00000021;
}
.home-nav {
	margin-top: -7px;
	border: none;
	background-color: #ffffff;
}
.home-nav-item {
	height: 60px;
	flex-direction: row;
	margin: 3px 8px;
	padding: 3px 8px;
	font-size: 16px;
	line-height: 60px;
	background-color: white;
	border: none;
	border-radius: 0;
}
.home-nav-item::before {
	height: 45px;
	width: 155px;
	content: "";
	position: absolute;
	left: 0;
	top: 10px;
	background-color: #00000000;
	border-radius: 5px;
}
.home-nav-item:hover.home-nav-item::before {
	background-color: #6969691a;
}
.home-nav-item.is-active {
	background-color: white !important;
}
</style>
