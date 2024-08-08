<template>
  <div class=''>

        <div
      style="height: 50px; width: 100%; background-color: #fcfcfc; border-bottom: 1px solid rgba(208, 208, 208, 0.6); 
      display: flex; align-items: center; justify-content: space-between; padding: 0 20px "
    >
      <el-input v-model="query" suffix-icon="el-icon-search" placeholder="搜索项目" style="width: 300px; margin-right: 20px"></el-input>
      <div style="display: flex; align-items: center;">
        <el-select v-model="opt" placeholder="请选择" style="width: 150px;">
          <el-option
            v-for="item in sortedOptions"
            :key="item.opt"
            :label="item.label"
            :value="item.opt"
          ></el-option>
        </el-select>
        <el-button style="margin-left: 10px;" @click="toggleSortOrder" :icon="sortIcon" plain></el-button>
      </div>
    </div>

    
    <ProjectList v-if="tableData.length > 0" :table-data="tableData" />

    <el-empty v-else description="暂无项目"></el-empty>
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';

export default {
  name: "",
  components: {ProjectList},
    data() {
      return {
        tableData:[]

      };
    },
  computed: {},
  watch: {},
  methods: {

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
</style>