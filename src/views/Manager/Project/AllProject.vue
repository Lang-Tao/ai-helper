<template>
  <div>
    <div
      style="height: 50px; width: 100%; background-color: #fcfcfc; border-bottom: 1px solid rgba(208, 208, 208, 0.6); 
      display: flex; align-items: center; justify-content: space-between; padding: 0 20px "
    >
      <el-input v-model="query" suffix-icon="el-icon-search" placeholder="搜索项目" style="width: 300px; margin-right: 20px"></el-input>
      <div style="display: flex; align-items: center;">
        <el-select v-model="opt" placeholder="请选择" style="width: 150px;">
          <el-option
            v-for="item in options"
            :key="item.opt"
            :label="item.label"
            :value="item.opt"
          ></el-option>
        </el-select>
        <el-button style="margin-left: 10px;" @click="toggleSortOrder" :icon="sortIcon" plain></el-button>
      </div>
    </div>
    


    <!--项目列表-->
    <ProjectList v-if="sortedAndFilteredData.length > 0" :projetArray="sortedAndFilteredData" 
      @add-to-favorites="addToFavorites" @remove-from-favorites="removeFromFavorites" />
    <el-empty v-else description="暂无项目"></el-empty>
  </div>
</template>

<script>
import ProjectList from "@/components/project/ProjectList.vue";
import { getProjectList, updateProject } from "@/api/project";

export default {
  name: "allproject",
  components: {
    ProjectList,
  },
  data() {
    return {
      query: "",
      options: [
        { opt: "accessTime", label: "按访问时间" },
        { opt: "createTime", label: "按创建时间" },
        { opt: "name", label: "按项目名称" },
      ],
      opt: "accessTime",
      sortOrder: "asc",
      sortIcon: "iconfont icon-zhengxu",
      projectData: [],
    };
  },
  computed: {
    sortedAndFilteredData() {
      const query = this.query.toLowerCase();
      let filteredData = this.projectData.filter((item) => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.address.toLowerCase().includes(query) ||
          item.admin.toLowerCase().includes(query)
        );
      });

      let sortedData = filteredData.sort((a, b) => {
        let compareA = a[this.opt];
        let compareB = b[this.opt];

        if (this.opt === "name" || this.opt === "admin") {
          compareA = compareA.toLowerCase();
          compareB = compareB.toLowerCase();
        }

        if (this.sortOrder === "asc") {
          return compareA > compareB ? 1 : -1;
        } else {
          return compareA < compareB ? 1 : -1;
        }
      });

      return sortedData;
    },
  },
  methods: {
    getProjectList() {
      getProjectList()
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.projectData = res.data;
          } else {
            console.error(res.message || "Failed to fetch project list");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    },

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.sortIcon =
        this.sortOrder === "asc"
          ? "iconfont icon-zhengxu"
          : "iconfont icon-daoxu";
    },
    addToFavorites(project) {
      project.isFavorite = true;
      // 更改项目信息
      updateProject(project).then((res) => {
        if (res.code === 0) {
          this.$message.success("添加成功");
        } else {
          this.$message.error(res.message || "添加失败");
        }
      });
    },
    removeFromFavorites(project) {
      project.isFavorite = false;
      // 更改项目信息
      updateProject(project).then((res) => {
        if (res.code === 0) {
          this.$message.success("移除成功");
        } else {
          this.$message.error(res.message || "移除失败");
        }
      });
    },
  },
  mounted() {
    this.getProjectList();
  },
};
</script>

<style scoped>
.el-empty {
  margin-top: 150px;
}
</style>
