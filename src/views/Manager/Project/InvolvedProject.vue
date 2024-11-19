<template>
  <div class=''>
    

    <!--常用项目卡-->
    <div  style="display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;  margin:20px 5px 0"> 
      <span class="title">常用项目</span>
      <el-card shadow="never" v-if="favoriteProjects.length === 0" class="noProjects">
        <span style="font-size: 14px;  color: #657694; ">暂无常用项目设置</span>
      </el-card>
      <div v-else style="display: flex; flex-direction:row; flex-wrap:wrap; justify-content:flex-start; align-items:flex-start; width:100%">
        <el-card shadow="hover" v-for="(project, index) in favoriteProjects" :key="index" class="project-item">
          <!--常用项目卡.header-->
          <div slot='header'  >
            <span class="card-header-span" @click="handleIconClick('Repository', project, $event)" style="font-size: 14px;  color: #657694; line-height: 24px; ">
               {{ project.name.length > 8 ? project.name.substring(0, 8) + '...' : project.name }} 
            </span>
            <el-button style="margin-left:5px" icon="iconfont icon-shuqian" type="text" @click="removeFromFavorites(project)"></el-button>
          </div>
          <!--常用项目卡.按钮组-->
          <div style="display: flex; justify-content: space-between; align-items: center; width:150px; margin:-7px 0 0 -12px">
            <el-tooltip class="item" effect="dark" content="智能问答" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-zhinengwenda"
                @click="handleIconClick('QnA', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="代码仓库" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-daimacangku"
                @click="handleIconClick('Repository', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="知识管理" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-zhishiku"
                @click="handleIconClick('Knowledge', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目总结" placement="top" :open-delay="500">
              <el-button
                icon="iconfont icon-xiangmuzongjie"
                @click="handleIconClick('Summary', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px;">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="项目设置" placement="top" :open-delay="500">
              <el-button
                icon="el-icon-setting"
                @click="handleIconClick('Setting', project, $event)"
                style="padding: 0; min-width: 32px; min-height: 32px; font-size:16px">
              </el-button>
            </el-tooltip>
          </div>
        </el-card>
      </div>
    </div>


    <!--项目列表-->
    <ProjectList v-if="involvedProjectList.length > 0" :projetArray="involvedProjectList" 
      @add-to-favorites="addToFavorites" @remove-from-favorites="removeFromFavorites" />
    <el-empty v-else description="暂无项目"></el-empty>
  </div>
</template>

<script>
import ProjectList from "@/components/project/ProjectList.vue";
import { getProjectList, updateProject } from "@/api/project";

export default {
  name: "",
  components: { ProjectList },
  data() {
    return {
      involvedProjectList: [],
      favoriteProjects: [],
    };
  },

  methods: {
    addToFavorites(project) {
      if (!this.favoriteProjects.includes(project)) {
        project.isFavorite = true;
        // 更改项目信息
        updateProject(project).then((res) => {
          console.log(res);
          console.log(project);

          if (res.code === 0) {
            this.$message.success("添加成功");
            this.favoriteProjects.push(project);
          } else {
            this.$message.error("添加失败");
          }
        });
      }
    },
    removeFromFavorites(project) {
      if (this.favoriteProjects.includes(project)) {
        project.isFavorite = false;
        // 更改项目信息
        updateProject(project).then((res) => {
          console.log(res);
          console.log(project);

          if (res.code === 0) {
            this.$message.success("移除成功");
            this.favoriteProjects.splice(
              this.favoriteProjects.indexOf(project)
            );
          } else {
            this.$message.error("移除失败");
          }
        });
      }
    },
    handleIconClick(func, row, event) {
      event.stopPropagation(); // 阻止事件冒泡
      console.log("Icon clicked:", func, row);
      this.$router.push({
        name: `project${func}`,
        params: { address: row.address, title: row.name },
      });
    },

    // 调用接口获取参与项目列表
    getProjectList() {
      getProjectList().then((res) => {
        this.involvedProjectList = res.data;

        // 将isFavorite为true的项目添加到favoriteProjects数组中
        for (const project of this.involvedProjectList) {
          if (project.isFavorite) {
            this.favoriteProjects.push(project);
          }
        }
      });
    },
  },

  mounted() {
    this.getProjectList(); // 调用方法获取项目列表
  },
};
</script>

<style scoped>
.el-empty {
  margin-top: 150px;
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin: 20px;
}
.el-card {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  background-color: #fff;
  margin: 10px 20px;
  border-radius: 10px;
}
.noProjects {
  width: 480px;
  height: 160px;
}

.project-item {
  width: 224px;
  height: 118px;
}

.el-card_body {
  padding: 0 !important;
}
.el-card__header .card-header-span:hover {
  color: #0080ff !important;
  cursor: pointer !important;
}
</style>
