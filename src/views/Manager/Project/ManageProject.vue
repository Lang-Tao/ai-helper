<template>
  <div>

    <!--搜索筛选栏-->
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
    <ProjectList v-if="sortedAndFilteredData.length > 0" :projetArray="sortedAndFilteredData" />
    <el-empty v-else description="暂无项目"></el-empty>

  </div>
</template>

<script>
import ProjectList from "@/components/project/ProjectList.vue";

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
      allProjectList: [
        {                                // 测试数据，实际数据需要从后端获取
          name: "项目2",
          address: "xiangmu2",
          admin: "管理员2",
          adminAvatar: "",
          operation: "操作2",
          accessTime: "2024-08-06",
          createTime: "2024-08-02",
        }, 
      ],
    };
  },
  computed: {
    sortedAndFilteredData() {
      const query = this.query.toLowerCase();
      let filteredData = this.allProjectList.filter((item) => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.address.toLowerCase().includes(query) ||
          item.admin.toLowerCase().includes(query)
        );
      });

      let sortedData = filteredData.sort((a, b) => {
        let compareA = a[this.opt];
        let compareB = b[this.opt];

        if (this.opt === 'name' || this.opt === 'admin') {
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
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.sortIcon = this.sortOrder === "asc" ? "iconfont icon-zhengxu" : "iconfont icon-daoxu";
    },
    getAllProjectList() {
      // todo 调用接口获取所有项目列表
      // this.allProjectList = response.data;
    },
  },
};
</script>

<style scoped>
.el-empty {
  margin-top: 150px;
}
</style>
