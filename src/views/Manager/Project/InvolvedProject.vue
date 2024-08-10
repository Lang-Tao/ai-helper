<template>
  <div class=''>
    
    <div  style="display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;  margin:20px 5px 0">
     
      <span class="title">常用项目</span>

      <el-card v-if="favoriteProjects.length === 0" class="noProjects">

        <span style="font-size: 14px;  color: #657694; ">暂无常用项目设置</span>

      </el-card>

      <div v-else style="display: flex; flex-direction:row; flex-wrap:wrap; justify-content:flex-start; align-items:flex-start; width:100%">

        <el-card  v-for="(project, index) in favoriteProjects" :key="index" class="project-item">

          <div slot='header'>
           
            <span style="font-size: 14px;  color: #657694; line-height: 24px;">{{ project.name }}</span>
            
          
            <el-button style="margin-left:125px" icon="iconfont icon-shuqian" type="text" @click="removeFromFavorites(index)"></el-button>
          </div>

          
          <div style="display: flex; justify-content: space-between; align-items: center; width:150px; margin:-7px 0 0 -12px">
            <el-tooltip class="item" effect="dark" content="智能问答" placement="top" open-delay="500">
              <el-button
                icon="iconfont icon-zhinengwenda"
                @click="handleIconClick('QnA', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目概览" placement="top" open-delay="500">
              <el-button
                icon="iconfont icon-xiangmugailan"
                @click="handleIconClick('Home', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="代码仓库" placement="top" open-delay="500">
              <el-button
                icon="iconfont icon-daimacangku"
                @click="handleIconClick('Repository', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目协同" placement="top" open-delay="500">
              <el-button
                icon="iconfont icon-xiangmuxietong"
                @click="handleIconClick('Collaboration', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目总结" placement="top" open-delay="500">
              <el-button
                icon="iconfont icon-xiangmuzongjie"
                @click="handleIconClick('Summary', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
          </div>
       


          
        </el-card>

      </div>




    </div>
    



    <ProjectList v-if="tableData.length > 0" :table-data="tableData" @add-to-favorites="addToFavorites" />

    <el-empty v-else description="暂无项目"></el-empty>
  </div>
</template>

<script>
import ProjectList from '@/components/project/ProjectList.vue';
import { Message } from 'element-ui'

export default {
  name: "",
  components: {ProjectList},
    data() {
      return {
          tableData: [{
            name: '项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项',
            address:'xiangmu1',
            admin: '管理员1',
            adminAvatar: '', 
            operation: '操作1'
          },],
          favoriteProjects:[],

      };
    },

  methods: {
    addToFavorites(project) {
      this.favoriteProjects.push(project);
      Message({
          message: '添加成功',
          type: 'success',
          duration: 3000, // 消息框显示时间，毫秒为单位 
          });

    },
    removeFromFavorites(index) {
      this.favoriteProjects.splice(index, 1);
       Message({
          message: '移除成功',
          type: 'success',
          duration: 3000, // 消息框显示时间，毫秒为单位 
          });

    },
    handleIconClick(func, row, event) {
      event.stopPropagation(); // 阻止事件冒泡
      console.log("Icon clicked:", func, row);
      this.$router.push({ name: `project${func}`, params: { address: row.address, title: row.name } });
    },
  },
  created() {

  },
  mounted() {

  },
}

</script>

<style scoped>
.el-empty{
  margin-top: 150px;
}
.title{
  font-size: 18px;
  font-weight: 600;
  margin: 20px;

}
.el-card{
 
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;;
  background-color: #fff;
  margin: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}
.noProjects{
  width: 480px;
  height: 160px;
}

.project-item{
  width: 224px;
  height: 118px;
}

.el-card_body{
  padding: 0 !important;
}


</style>