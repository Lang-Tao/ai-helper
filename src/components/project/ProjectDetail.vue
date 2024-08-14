<template>
  <div>

    <el-aside width="200px" style="height: 100vh;position:fixed">
      <el-menu
        :default-active="activePath"
        style="height: 100vh; "
        router
      >
        <el-menu-item :index="getDynamicPath('home')">
          <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-xiangmugailan" />
          <span  slot="title">项目概览</span>
        </el-menu-item>

        <el-menu-item :index="getDynamicPath('QnA')">
          <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-zhinengwenda" />
          <span slot="title">智能问答</span>
        </el-menu-item>

        <el-menu-item :index="getDynamicPath('Repository')">       
          <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-daimacangku" />
          <span slot="title">代码仓库</span>
        </el-menu-item>
        
        <el-menu-item :index="getDynamicPath('Collaboration')">
           <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-xiangmuxietong" />
          <span slot="title">项目协同</span>
        </el-menu-item>

        <el-menu-item :index="getDynamicPath('Summary')">
            <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-xiangmuzongjie" />
          <span slot="title">项目总结</span>
        </el-menu-item>

        <el-menu-item :index="getDynamicPath('Setting')">
            <i style="margin:0 10px 0 0px; font-size:18px; line-height:18px" class="iconfont icon-shezhi" />
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
  name: 'ProjectDetails',
  props: ['address'],
  data() {
    return {
      project: {},
      activePath: `${this.$route.path.split('/').slice(0, 4).join('/')}`, 
    };
  },
  created() {
    this.fetchProjectData();
    
  },
  computed: {
      getDynamicPath() {
        return (subPath) => `/project-details/${this.$route.params.address}/${subPath}`;
    }
  },
  watch: {
    '$route.params.address': 'fetchProjectData',
  },
  methods: {
    fetchProjectData() {
      const projectAddresss = this.$route.params.address;
      // 根据项目ID获取项目数据，这里使用示例数据
      const projectData = {
        '1': { name: '项目1', description: '项目1的描述' },
        // 添加更多项目数据
      };
      this.project = projectData[projectAddresss] || { name: '未知项目', description: '未找到项目详情' };
    }
  }
};
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
