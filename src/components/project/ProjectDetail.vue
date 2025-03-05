<template>
  <div>
    <el-aside width="200px" style="height: 100vh;position:fixed">
      <el-menu
        :default-active="activePath"
        style="height: 100vh; "
        router
      >

        <!-- <el-menu-item :index="getDynamicPath('Repository')">       
          <i class="iconfont icon-daimacangku" />
          <span slot="title">代码仓库</span>
        </el-menu-item> -->
        
        <!-- <el-menu-item :index="getDynamicPath('home')">
          <i class="iconfont icon-xiangmugailan" />
          <span  slot="title">项目概览</span>
        </el-menu-item> -->

        <el-menu-item :index="getDynamicPath('Knowledge')">
          <i class="iconfont icon-zhishiku"></i>
          <span slot="title">知识管理</span>
        </el-menu-item>

        <el-menu-item :index="getDynamicPath('QnA')">
          <i class="iconfont icon-zhinengwenda" />
          <span slot="title">智能问答</span>
        </el-menu-item>

        
        
        <!-- <el-menu-item :index="getDynamicPath('Collaboration')">
           <i class="iconfont icon-xiangmuxietong" />
          <span slot="title">项目协同</span>
        </el-menu-item> -->

        

        <!-- <el-menu-item :index="getDynamicPath('Summary')">
            <i class="iconfont icon-xiangmuzongjie" />
          <span slot="title">项目总结</span>
        </el-menu-item> -->

        <el-menu-item :index="getDynamicPath('Setting')">
            <i class="iconfont icon-shezhi" />
          <span slot="title">项目设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main style="padding: 0; margin-left: 200px;">
      <router-view/>
    </el-main>
  </div>
</template>

<script>
export default {
	name: "ProjectDetails",
	props: ["address"],
	data() {
		return {
			activePath: `${this.$route.path.split("/").slice(0, 4).join("/")}`,
		};
	},
	computed: {
		getDynamicPath() {
			return (subPath) =>
				`/project-details/${this.$route.params.address}/${subPath}`;
		},
	},
};
</script>

<style scoped>
.el-menu-item {
	transition: none !important;
	text-align: center;
	margin: 5px;
	border-radius: 8px;
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
	background-color: #e5ecff !important; /*选中颜色*/
	color: #3f6ffc !important; /*选中文字颜色*/
}
i {
	margin: 2px 10px 0 -5px;
	font-size: 18px;
	line-height: 18px;
}
</style>
